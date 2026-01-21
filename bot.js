const { spawnSync } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');

// Aapka confirmed path jo terminal ne diya tha
const gitPath = "C:\\Program Files\\Git\\mingw64\\bin\\git.exe";
const totalCommits = 300;
const fileName = 'activity.txt';

console.log("Starting 300 unique commits manually...");

for (let i = 1; i <= totalCommits; i++) {
    // Har baar unique content taake commit repeat na ho
    const randomContent = crypto.randomBytes(16).toString('hex');
    const timestamp = new Date().toISOString();

    const line = `Commit: ${i} | ID: ${randomContent} | Time: ${timestamp}\n`;

    // File update karna
    fs.appendFileSync(fileName, line);

    // Git Add (Using your gitPath)
    spawnSync(gitPath, ['add', fileName]);

    // Git Commit
    const commit = spawnSync(gitPath, ['commit', '-m', `Manual Commit #${i}: ${randomContent}`]);

    if (commit.error) {
        console.error(`Error at commit ${i}:`, commit.error.message);
        break;
    } else {
        console.log(`Commit ${i}/${totalCommits} done.`);
    }
}

console.log("Pushing to GitHub...");

// Git Push (Check karein ke aapki branch 'master' hi hai)
const push = spawnSync(gitPath, ['push', 'origin', 'master']);

if (push.error) {
    console.error("Push fail ho gaya. Internet check karein.");
} else {
    console.log("Success! 300 unique commits push ho gaye hain.");
}