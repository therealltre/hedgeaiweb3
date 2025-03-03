import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const response = await axios.post(
      "http://3.84.217.67:8000/chat/kraj",
      req.body,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
