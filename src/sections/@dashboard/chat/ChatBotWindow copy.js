import { useState, useRef, useEffect } from "react";
import { Box, Divider, Typography, IconButton, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/Iconify";
import uuidv4 from "../../../utils/uuidv4";
import Scrollbar from "@/components/Scrollbar";
import { useAccount, usePublicClient, useWalletClient } from "wagmi"; // Updated imports
import { useRouter } from "next/navigation";
import usePriceFeed from "./chat-components/PriceFeeds";
import { ethers } from "ethers";

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
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [messages, setMessages] = useState(sampleChats);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [tradingExecutor, setTradingExecutor] = useState(null);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    const setupTrading = async () => {
      if (!isConnected || !window.ethereum) return;

      try {
        // Use Web3Provider instead of BrowserProvider for ethers v5
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const priceFeed = new ethers.Contract(
          PRICE_FEED_ADDRESS,
          PRICE_FEED_ABI,
          provider
        );

        const executor = new TradingExecutor(provider, signer, priceFeed);
        setTradingExecutor(executor);

        // Start position monitoring
        const monitorInterval = setInterval(() => {
          executor.monitorPositions();
        }, 30000);

        return () => clearInterval(monitorInterval);
      } catch (error) {
        console.error("Trading setup error:", error);
        console.error(error.message);
      }
    };

    setupTrading();
  }, [isConnected]); // Simplified dependencies

  // Enhanced bot response handler with more trading commands
  const handleBotResponse = (message) => {
    const cmd = message.toLowerCase();

    if (cmd.includes("start trading")) {
      if (!tradingExecutor) {
        return "Trading system not initialized. Please check your wallet connection.";
      }

      setIsTrading(true);
      return "Automated trading started. I will execute trades based on market conditions and notify you of all actions.";
    }

    if (cmd.includes("stop trading")) {
      setIsTrading(false);
      return "Automated trading stopped. All new trades are paused.";
    }

    if (cmd.includes("positions")) {
      if (!tradingExecutor) return "No trading system initialized";
      const positions = Array.from(tradingExecutor.positions.values());
      if (positions.length === 0) return "No active positions";

      return `Active positions:\n${positions
        .map(
          (p) =>
            `${p.type} ${p.amount} @ ${p.price}\nSL: ${p.stopLoss}\nTP: ${p.takeProfit}`
        )
        .join("\n\n")}`;
    }

    if (cmd.includes("balance")) {
      return `Connected wallet: ${address}\nYour current balance is 2.5 BTC and $10,000 USDT.`;
    }
    if (cmd.includes("price")) {
      return "The current BTC price is $102,500.";
    }
    if (cmd.includes("order")) {
      return "Would you like to place a market or limit order? Please specify the type and amount.";
    }
    if (cmd.includes("market") && cmd.includes("buy")) {
      return "Processing market buy order... Please confirm the transaction in your wallet.";
    }
    if (cmd.includes("market") && cmd.includes("sell")) {
      return "Processing market sell order... Please confirm the transaction in your wallet.";
    }
    if (cmd.includes("help")) {
      return `Available commands:
  - Check balance
  - Check price
  - Place order (market/limit)
  - Buy/Sell [amount] [token]
  - View history`;
    }

    return "I'm not sure I understand. Type 'help' for available commands.";
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const userMessage = { id: uuidv4(), sender: "user", text: message };
    setMessages([...messages, userMessage]);
    setMessage("");

    setTimeout(() => {
      const botReply = handleBotResponse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), sender: "bot", text: botReply }
      ]);
    }, 1000);
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
        Crypto Trading Bot
      </Typography>

      <Divider />

      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          {/* chat messages  */}

          <Scrollbar
            scrollableNodeProps={{ ref: scrollRef }}
            sx={{ p: 3, height: 1 }}
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
