import { GitHubService } from "./github-service";

const githubService = new GitHubService();

async function test() {
  try {
    const commits = await githubService.getRecentCommits({
      owner: "stap777",
      repo: "SonD",
      perPage: 5,
    });

    if (commits.length === 0) {
      throw new Error("No commits returned from GitHub.");
    }

    console.log(`Retrieved ${commits.length} recent commits:\n`);
    commits.forEach((commit) => {
      console.log(`${commit.sha.slice(0, 7)} ${commit.message.split("\n")[0]}`);
    });
  } catch (error) {
    console.error("GitHub test failed:", error);
    process.exitCode = 1;
  }
}

test();
