import main from "../services/ai.services.js";

export const getResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "prompt is required" });
    }

    const result = await main(prompt);

    res.status(200).json({ message: prompt})
}