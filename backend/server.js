// backend/server.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/suggest-path", async (req, res) => {
    const { interest, skill, goal } = req.body;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "پاسخ را فقط به صورت JSON معتبر و بدون هیچ توضیح اضافه برگردان."
                    },
                    {
                        role: "user",
                        content: `کاربری علاقه‌مند به ${interest} است، مهارتش ${skill} و هدفش ${goal} است. لطفا مسیر یادگیری مناسب را در قالب JSON معتبر بده.`
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const result = JSON.parse(response.data.choices[0].message.content);
        res.json(result);
    } catch (error) {
        console.error("خطا:", error.response?.data || error.message);
        res.status(500).json({ error: "خطا در دریافت پاسخ از OpenAI" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ سرور روی http://localhost:${PORT} اجرا شد`);
});
