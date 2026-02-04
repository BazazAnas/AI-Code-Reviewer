import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "dotenv"

env.config()

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// USE ONE OF THE STRINGS FROM YOUR LIST:
// 'gemini-flash-latest' is the replacement for 'gemini-1.5-flash'
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function main(prompt) {
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text())
        return result.response.text();

    } catch (error) {
        // If you still get a 429 Limit: 0 error here, 
        // it means you MUST use a VPN to USA or enable Billing.
        console.error("Gemini Error:", error);
        throw error;
    }
}

export default main;