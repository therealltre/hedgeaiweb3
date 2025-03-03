import { useState, useRef, useEffect } from "react";
import { Box, Divider, Typography, IconButton, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/Iconify";
import uuidv4 from "../../../utils/uuidv4";
import Scrollbar from "@/components/Scrollbar";
import { useRouter } from "next/navigation";
import usePriceFeed from "./chat-components/PriceFeeds";
import {
  useConnection,
  useWallet,
  WalletProvider
} from "@solana/wallet-adapter-react";
import { useWalletClient } from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction } from "@solana/web3.js";
import axios from "axios";
require("@solana/wallet-adapter-react-ui/styles.css");

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 56,
  display: "flex",
  position: "relative",
  alignItems: "center",
  paddingLeft: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(2)
  }
}));

const sampleChats = [
  {
    id: "1",
    sender: "bot",
    text: "Hello! I am your Crypto Trading Bot. How can I assist you today?"
  }
];

const MessageRootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2)
}));

const ContentStyle = styled("div")(({ theme, owner }) => ({
  maxWidth: "80%", // Adjusts for smaller screens
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: owner
    ? theme.palette.primary.main
    : theme.palette.background.neutral,
  color: owner ? theme.palette.grey[200] : theme.palette.text.primary,
  alignSelf: owner ? "flex-end" : "flex-start"
}));

export default function CryptoChatbot() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const router = useRouter();
  const [messages, setMessages] = useState(sampleChats);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const [tradingExecutor, setTradingExecutor] = useState(null);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    if (!connected) {
      router.push("/dashboard/app");
    }
  }, [connected, router]);

  useEffect(() => {
    const setupTrading = async () => {
      if (!connected) return;

      try {
        // You can also interact with Solana smart contracts and price feeds
        setTradingExecutor({}); // Example placeholder for actual setup
      } catch (error) {
        console.error("Trading setup error:", error);
      }
    };

    setupTrading();
  }, [connected]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]); // Triggered when messages are updated

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { id: uuidv4(), sender: "user", text: message };
    setMessages([...messages, userMessage]);
    setMessage("");

    try {
      // Send the user's message to the proxy API
      const response = await axios.post("/api/proxi", {
        user_input: message // Send the user's message
      });

      console.log(response.data);

      const botReply =
        response.data.response || "I couldn't process your request.";

      // Update the messages with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), sender: "bot", text: botReply }
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          sender: "bot",
          text: "Error connecting to chatbot service."
        }
      ]);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        border: "1px solid #2065D1",
        borderRadius: "20px",
        p: 2,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        <IconButton color="white">
          <Iconify icon="bxs:bot" width={24} height={24} />
        </IconButton>
        Hedge Trading Bot
      </Typography>

      <Divider />

      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          {/* chat messages */}

          <Scrollbar
            scrollablenodeprops={{ ref: scrollRef }}
            sx={{ p: 3, height: 1, overflowY: "auto" }}
          >
            {messages.map((msg) => (
              <MessageRootStyle
                key={msg.id}
                sx={{
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start"
                }}
              >
                <ContentStyle owner={msg.sender === "user"}>
                  <Typography variant="body2">{msg.text}</Typography>
                </ContentStyle>
              </MessageRootStyle>
            ))}
          </Scrollbar>

          <Divider sx={{ my: 2 }} />

          {/* ChatMessageInput */}
          <RootStyle>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} />

            <Input
              fullWidth
              value={message}
              disableUnderline
              onChange={(event) => setMessage(event.target.value)}
              placeholder="enter a command"
              onKeyUp={(event) => event.key === "Enter" && handleSendMessage()}
            />

            <Divider orientation="vertical" flexItem />
            <IconButton
              color="primary"
              disabled={!message}
              onClick={handleSendMessage}
              sx={{ mx: 1 }}
            >
              <Iconify icon="ic:round-send" width={22} height={22} />
            </IconButton>
          </RootStyle>
        </Box>
      </Box>
    </Box>
  );
}
