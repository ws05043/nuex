const fs = require('fs');
const { execSync } = require('child_process');

// Read the new version from command argument
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('Please provide a version number');
  process.exit(1);
}

// Update package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Git commands
try {
  execSync('git add package.json');
  execSync(`git commit -m "v${newVersion}: Version bump"`);
  execSync(`git tag v${newVersion}`);
  execSync('git push origin main');
  execSync(`git push origin v${newVersion}`);
  
  console.log(`Successfully updated to version ${newVersion}`);
} catch (error) {
  console.error('Error updating version:', error);
} 