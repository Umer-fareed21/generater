const { spawnSync } = require('child_process');
const fs = require('fs');

// Aapka confirmed path
const gitPath = "C:\\Program Files\\Git\\mingw64\\bin\\git.exe";
const totalCommits = 150;

console.log("Starting auto commits...");

for (let i = 1; i <= totalCommits; i++) {
    const content = `Commit number: ${i} - Date: ${new Date().toISOString()}\n`;
    fs.appendFileSync('activity.txt', content);

    // Git Add
    spawnSync(gitPath, ['add', 'activity.txt']);
    
    // Git Commit
    const commit = spawnSync(gitPath, ['commit', '-m', `Auto commit #${i}`]);
    
    if (commit.error) {
        console.error(`Error at commit ${i}:`, commit.error.message);
        break;
    } else {
        console.log(`Commit ${i}/${totalCommits} done.`);
    }
}

console.log("Pushing to GitHub...");
// Git Push (Master branch)
const push = spawnSync(gitPath, ['push', 'origin', 'master']);

if (push.error) {
    console.error("Push fail ho gaya:", push.error.message);
} else {
    console.log("Mubarak ho! Sab kuch sahi se ho gaya.");
}