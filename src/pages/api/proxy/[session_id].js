// pages/api/proxy/[session_id].js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { session_id } = req.query;

  console.log("Incoming request:", {
    session_id,
    body: req.body
  });

  try {
    // const url = `http://3.84.217.67:8000/connect_wallet_public/${session_id}`; //private key
    const url = `http://3.84.217.67:8000/connect_wallet/kraj/${session_id}`; //public key

    console.log("Making request to:", url);

    const response = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    console.log("Backend response:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    res.status(error.response?.status || 500).json({
      error: "Failed to connect wallet",
      details: error.response?.data || error.message
    });
  }
}
