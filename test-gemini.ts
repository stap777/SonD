import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";

// 1. Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
const envFileExists = fs.existsSync(envPath);

let dotenvResult;
if (envFileExists) {
  dotenvResult = dotenv.config({ path: envPath });
}

// 2. Print useful diagnostics
console.log("=== DIAGNOSTICS ===");
console.log(`Current Working Directory : ${process.cwd()}`);
console.log(`.env.local File Found     : ${envFileExists}`);
console.log(`.env.local Loaded Status  : ${dotenvResult && !dotenvResult.error ? "Success" : "Failed/Not Loaded"}`);

const apiKey = process.env.GEMINI_API_KEY;
console.log(`Gemini API Key Exists     : ${!!apiKey}`);
console.log("===================\n");

// 3. Verify GEMINI_API_KEY exists
if (!apiKey) {
  console.error("[ERROR] GEMINI_API_KEY not found");
  process.exit(1);
}

async function testConnection() {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  console.log(`Sending request to model: ${model}...`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Reply with exactly: Gemini connection successful",
              },
            ],
          },
        ],
      }),
    });

    console.log(`HTTP Status: ${response.status} ${response.statusText}`);

    interface GeminiResponse {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    }
    const data = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      console.error("[ERROR] Gemini API request failed!");
      console.error("HTTP Status Code:", response.status);
      
      // Check for specific error types
      if (response.status === 400) {
        console.error("Error Detail: Bad request. Possibly invalid model, API version, or payload format.");
      } else if (response.status === 403) {
        console.error("Error Detail: Forbidden/Invalid key. Please check your API key credentials.");
      } else if (response.status === 429) {
        console.error("Error Detail: Quota exceeded or rate limit hit.");
      }
      
      console.error("Full API Error Details:", JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error("[ERROR] Malformed response from Gemini API! Could not find candidates text.");
      console.error("Received Response:", JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log("\nGemini Response Text:");
    console.log("---------------------");
    console.log(text.trim());
    console.log("---------------------\n");

    if (text.trim().includes("Gemini connection successful")) {
      console.log("Verification Succeeded!");
    } else {
      console.warn("WARNING: Response text did not exactly match the prompt instruction, but request was successful.");
    }
  } catch (error) {
    console.error("[ERROR] Network failure or request exception!");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
