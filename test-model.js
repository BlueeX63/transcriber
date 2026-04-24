require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModel() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  try {
    const result = await model.generateContent("Say hello!");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.error("Error:", e);
  }
}

testModel();
