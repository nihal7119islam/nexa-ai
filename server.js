
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Nexa AI Server is running!");
});

app.post("/api/chat", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                error: "Question is required"
            });
        }

        // AI connection will be added in the next step.
        res.json({
            answer: "তোমার প্রশ্ন পেয়েছি: " + question
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Nexa AI server running on port ${PORT}`);
});
