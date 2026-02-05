import express from "express"
import { getResponse } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/get-response", getResponse);

export default router;