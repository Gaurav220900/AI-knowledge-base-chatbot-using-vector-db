import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse-fork");

export async function extractText(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text.trim();
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}
