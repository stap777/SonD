import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { CoralClientOptions } from "./coral-types";

const execFileAsync = promisify(execFile);

export class CoralClient {
  private readonly command: string;

  constructor(options: CoralClientOptions = {}) {
    this.command = options.command ?? process.env.CORAL_CLI_PATH ?? "coral";
  }

  async query<T extends object>(sql: string): Promise<T[]> {
    const { stdout } = await execFileAsync(this.command, ["sql", "--format", "json", sql], {
      maxBuffer: 1024 * 1024 * 10,
      windowsHide: true,
    });
    const rows: unknown = JSON.parse(stdout);

    if (!Array.isArray(rows)) {
      throw new Error("Coral query did not return a row array.");
    }

    return rows as T[];
  }
}
