const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/ia", async (req, res) => {
  const pergunta = req.body.pergunta;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um professor que explica de forma simples." },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await response.json();
  res.json({ resposta: data.choices[0].message.content });
});

app.listen(8080, () => console.log("Servidor rodando"));
