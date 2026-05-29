export class GeminiClient {
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;

  constructor(options: { apiKey?: string; model?: string } = {}) {
    this.apiKey = options.apiKey ?? process.env.GEMINI_API_KEY ?? "";
    this.model = options.model ?? process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    if (!this.apiKey) {
      throw new Error("Missing Gemini API key. Set GEMINI_API_KEY in the environment.");
    }
  }

  async generateContent(prompt: string, responseSchema?: object): Promise<string> {
    const url = `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`;

    interface Part {
      text: string;
    }

    interface Content {
      parts: Part[];
    }

    interface GenerationConfig {
      responseMimeType?: string;
      responseSchema?: object;
    }

    interface GeminiPayload {
      contents: Content[];
      generationConfig?: GenerationConfig;
    }

    const payload: GeminiPayload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    if (responseSchema) {
      payload.generationConfig = {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API request failed (${response.status}): ${errorText}`);
    }

    interface GeminiCandidatePart {
      text?: string;
    }

    interface GeminiCandidateContent {
      parts?: GeminiCandidatePart[];
    }

    interface GeminiCandidate {
      content?: GeminiCandidateContent;
    }

    interface GeminiResponse {
      candidates?: GeminiCandidate[];
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Invalid response structure from Gemini API");
    }

    return text;
  }
}
