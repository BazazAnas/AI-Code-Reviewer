import main from "../services/ai.services.js";

export const getResponse = async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: "code is required" });
    }

    const result = await main(code);

    res.status(200).send(result)
}