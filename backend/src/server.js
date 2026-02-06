import express from "express";
import env  from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors"

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use("/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})