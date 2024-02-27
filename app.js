const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const { default: translate } = await import("translate");
    const translation = await translate(text, { to: "fr" });
    res.status(200).json({ translation });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
