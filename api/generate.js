export default async function handler(req, res) {
  const prompt = req.query.prompt || "a futuristic robot";
const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  

  if (!response.ok) {
    const errorText = await response.text();
    console.log("HF error:", errorText);
    return res.status(500).json({ error: errorText });
  }

  const imageBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString("base64");

  res.status(200).json({ image: `data:image/png;base64,${base64}` });
}