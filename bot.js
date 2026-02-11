const { spawnSync } = require("child_process");
const fs = require("fs");
const crypto = require("crypto");

// Git ka exact path (Git Bash compatible)
const gitPath = "C:\\Program Files\\Git\\bin\\git.exe";

// pehle chota number rakho test ke liye
const totalCommits = 3000;

// file jisme activity likhi jaegi
const fileName = "activity.txt";

console.log("commit bot started...\n");

for (let i = 1; i <= totalCommits; i++) {
    const random = crypto.randomBytes(8).toString("hex");
    const line = `commit ${i} | ${random} | ${new Date().toISOString()}\n`;

    // file update
    fs.appendFileSync(fileName, line);

    // git add
    spawnSync(gitPath, ["add", "."], { stdio: "inherit" });

    // git commit
    const commit = spawnSync(
        gitPath,
        ["commit", "-m", `bot commit ${i} ${random}`],
        { stdio: "inherit" }
    );

    if (commit.status !== 0) {
        console.log("❌ commit fail hui, bot ruk gaya");
        break;
    }

    console.log(`✅ commit ${i}/${totalCommits} done`);
}

console.log("\npushing to github...\n");

// git push
spawnSync(gitPath, ["push", "origin", "master"], { stdio: "inherit" });

console.log("\n🎉 all done");
