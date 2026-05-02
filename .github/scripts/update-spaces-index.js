/**
 * update-spaces-index.js
 *
 * Reads all index-entry JSON files from output/index-entries/ and merges
 * them into public/data/spaces-index.json without duplicating existing entries.
 *
 * Each entry file has the shape:
 * {
 *   "spaceId": "java",
 *   "topicId": "collections",
 *   "question": {
 *     "id": "...",
 *     "title": "...",
 *     "filePath": "..."
 *   }
 * }
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INDEX_PATH = path.join(__dirname, "../../public/data/spaces-index.json");
const ENTRIES_DIR = path.join(__dirname, "../../output/index-entries");

const index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
const entryFiles = fs
  .readdirSync(ENTRIES_DIR)
  .filter((f) => f.endsWith(".json"));

let added = 0;

for (const file of entryFiles) {
  const entry = JSON.parse(
    fs.readFileSync(path.join(ENTRIES_DIR, file), "utf-8"),
  );
  const { spaceId, topicId, question } = entry;

  const space = index.spaces.find((s) => s.id === spaceId);
  if (!space) {
    console.warn(
      `[WARN] Space "${spaceId}" not found in spaces-index.json — skipping ${file}`,
    );
    continue;
  }

  const topic = space.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.warn(
      `[WARN] Topic "${topicId}" not found in space "${spaceId}" — skipping ${file}`,
    );
    continue;
  }

  const alreadyExists = topic.questions.some((q) => q.id === question.id);
  if (alreadyExists) {
    console.log(`[SKIP] Question "${question.id}" already in index`);
    continue;
  }

  topic.questions.push(question);
  added++;
  console.log(`[ADD] ${spaceId}/${topicId}/${question.id}`);
}

fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n", "utf-8");
console.log(`[DONE] Added ${added} question(s) to spaces-index.json`);
