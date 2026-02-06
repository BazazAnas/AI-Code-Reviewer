import express from "express";
import env  from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors"

env.config();


const allowedOrigins = process.env.CLIENT_URL.split(",");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: allowedOrigins
}))

app.use("/ai", aiRoutes);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})