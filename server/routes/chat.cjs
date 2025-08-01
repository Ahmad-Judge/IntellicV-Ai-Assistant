const express = require("express");
const { OpenAI } = require("openai");
const router = express.Router();



// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Express route for resume update
router.post('/api/update-resume', async (req, res) => {
  const { userMessage, resumeData, model = 'gpt-3.5-turbo' } = req.body;

  if (!userMessage || !resumeData) {
    return res.status(400).json({ message: "Missing userMessage or resumeData." });
  }

  const systemPrompt = `You are an AI assistant that helps users update their resume data.

Current resume data:
${JSON.stringify(resumeData, null, 2)}

Your job is to:
1. Understand what the user wants to change
2. Return ONLY a JSON object with the updated resume data
3. Keep all existing data unless specifically asked to change it
4. For new experiences/education, generate realistic descriptions if not provided
5. Be smart about interpreting requests (e.g., "add React" should go to skills)

Format your response as a JSON object with the same structure as the current resume data.
If you cannot understand the request, return: {"error": "Could not understand the request. Please be more specific."}`

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const gptText = completion.choices[0].message.content;

    try {
      const parsed = JSON.parse(gptText);

      if (parsed.error) {
        return res.status(200).json({ message: parsed.error });
      }

      return res.status(200).json({
        message: "Great! I've updated your resume based on your request.",
        resumeData: parsed
      });

    } catch (err) {
      return res.status(200).json({
        message: "I understood your request but had trouble updating the resume. Please try rephrasing."
      });
    }

  } catch (err) {
    console.error('OpenAI API error:', err);
    return res.status(500).json({
      message: `Error calling GPT API: ${err.message || 'Unknown error'}. Please check your server or OpenAI configuration.`
    });
  }
});

module.exports = router;