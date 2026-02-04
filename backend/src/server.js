import express from "express";
import env  from "dotenv";
import aiRoutes from "./routes/ai.routes.js";

env.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})