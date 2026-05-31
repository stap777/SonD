import { execFile } from "node:child_process";
import { promisify } from "node:util";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const execFileAsync = promisify(execFile);

async function run() {
  console.log("Environment variables in process.env:");
  console.log("PATH:", process.env.PATH);
  console.log("USERPROFILE:", process.env.USERPROFILE);
  console.log("LOCALAPPDATA:", process.env.LOCALAPPDATA);
  console.log("APPDATA:", process.env.APPDATA);
  console.log("USERNAME:", process.env.USERNAME);

  try {
    console.log("\nRunning: coral sql --format json \"SELECT * FROM github.meta LIMIT 1\"");
    const { stdout, stderr } = await execFileAsync("coral", ["sql", "--format", "json", "SELECT * FROM github.meta LIMIT 1"], {
      maxBuffer: 1024 * 1024 * 10,
      windowsHide: true,
    });
    console.log("STDOUT:", stdout.substring(0, 500));
    console.log("STDERR:", stderr);
  } catch (error: unknown) {
    const err = error as { message?: string; stdout?: string; stderr?: string };
    console.error("Execution failed:", err.message);
    if (err.stdout) console.error("FAILED STDOUT:", err.stdout);
    if (err.stderr) console.error("FAILED STDERR:", err.stderr);
  }
}

run();
