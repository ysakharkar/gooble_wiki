const express = require("express");
const crypto = require("crypto");

const PORT = 3000;

// expected SHA256 hash of the correct secret
const EXPECTED_HASH = "ce22e9577655c220f42467ceacc72d4a65d4354560ad43ce55b00f650bd2d445";

function hashSecret(secret) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

// read environment variable
const envSecret = process.env.GOOBLE_WIKI_SECRET;

if (!envSecret) {
  console.error("ERROR: GOOBLE_WIKI_SECRET is not set.");
  process.exit(1);
}

// compare hashes
const envHash = hashSecret(envSecret);

if (envHash !== EXPECTED_HASH) {
  console.error("ERROR: Invalid GOOBLE_WIKI_SECRET. Access denied.");
  process.exit(1);
}

console.log("Credential verified. Starting Gooble Wiki...");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Gooble Internal Wiki</h1>
    <p>Recruiter Documentation</p>

    <ul>
      <li>Candidate Outreach Email Template</li>
      <li>Interview Scheduling Guide</li>
      <li>Submitting Candidate Feedback</li>
      <li>Updating Your Address in the Employee Portal</li>
      <li>Employee Referral Program Guide</li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log("Gooble Wiki running at http://localhost:3000");
});