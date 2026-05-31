import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { CoralClientOptions } from "./coral-types";

const execFileAsync = promisify(execFile);

export class CoralAuthError extends Error {
  constructor(message: string, public readonly originalError: Error) {
    super(message);
    this.name = "CoralAuthError";
  }
}

export class CoralClient {
  private readonly command: string;

  constructor(options: CoralClientOptions = {}) {
    this.command = options.command ?? process.env.CORAL_CLI_PATH ?? "coral";
  }

  async query<T extends object>(sql: string): Promise<T[]> {
    const cmdArgs = ["sql", "--format", "json", sql];

    // Explicitly inherit env from parent, especially critical Windows user/system paths
    const childEnv = {
      ...process.env,
      // Fallback/safeguard: if Next.js runtime stripped USERPROFILE/APPDATA, try to use defaults
      USERPROFILE: process.env.USERPROFILE || "C:\\Users\\dsk",
      APPDATA: process.env.APPDATA || "C:\\Users\\dsk\\AppData\\Roaming",
      LOCALAPPDATA: process.env.LOCALAPPDATA || "C:\\Users\\dsk\\AppData\\Local",
    };

    console.log(`[DIAGNOSTIC] Coral Executable Path: ${this.command}`);
    console.log(`[DIAGNOSTIC] Working Directory: ${process.cwd()}`);

    try {
      const { stdout, stderr } = await execFileAsync(this.command, cmdArgs, {
        maxBuffer: 1024 * 1024 * 10,
        windowsHide: true,
        env: childEnv,
      });

      if (stderr && stderr.trim().length > 0) {
        console.warn(`[DIAGNOSTIC] Coral query executed with stderr:\n${stderr}`);
      }

      const rows: unknown = JSON.parse(stdout);
      if (!Array.isArray(rows)) {
        throw new Error("Coral query did not return a row array.");
      }

      return rows as T[];
    } catch (error: unknown) {
      const err = error as { stderr?: string; stdout?: string; message?: string };
      const stderr = err.stderr || "";
      const stdout = err.stdout || "";
      const errorMessage = err.message || "";

      console.error(`[DIAGNOSTIC] Coral Query Execution Failed!`);
      console.error(`[DIAGNOSTIC] Message: ${errorMessage}`);
      console.error(`[DIAGNOSTIC] Stderr: ${stderr}`);
      console.error(`[DIAGNOSTIC] Stdout: ${stdout}`);

      const fullErrorText = `${errorMessage}\n${stderr}\n${stdout}`;

      if (
        fullErrorText.includes("credential storage unavailable") ||
        fullErrorText.includes("keychain is unavailable") ||
        fullErrorText.includes("No matching credential found") ||
        fullErrorText.includes("401") ||
        fullErrorText.includes("Bad credentials") ||
        fullErrorText.includes("Source authentication failed")
      ) {
        throw new CoralAuthError(
          "GitHub source authentication failed. Reconnect Coral GitHub source.",
          error instanceof Error ? error : new Error(String(error))
        );
      }
      throw error;
    }
  }
}
