import { m } from "framer-motion";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Natural Language Processing",
    description:
      "Advanced language models trained for precise command interpretation."
  },
  {
    icon: <Icon icon="ph:network-duotone" width={40} height={40} />,
    title: "Neural Network Architecture",
    description:
      "Deep learning models for accurate insights, useful tips and deep comprehension of your commands."
  },
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Risk Management",
    description:
      "Ask our Agent to adjust your positions to maintain optimal risk levels."
  },
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Low-Latency Execution",
    description:
      "High-performance infrastructure ensures rapid trade execution and minimal slippage."
  },
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Market Analysis",
    description:
      "Real-time analysis of market conditions, trends, and trading opportunities. (Coming soon)"
  },
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Performance Analytics",
    description:
      "Detailed insights into trading performance and portfolio metrics. (Coming soon)"
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 365,
    height: "auto",
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(2, 2, 2),
    boxShadow: theme.customShadows.z12,
    backgroundColor: theme.palette.background.default,
    border: "1px solid #63b8f7",

    [theme.breakpoints.up("md")]: {
      boxShadow: "1px",
      border: "0.1px solid #63b8f7"
      // backgroundColor: theme.palette.primary.main
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -40 },
      border: "1px solid #63b8f7",
      backgroundColor: theme.palette.background.default
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.default,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        border: "1px solid #63b8f7",
        "&:before": {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: "auto",
          position: "absolute",
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.default
          // boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`
        }
      }
    }
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: "start",
            mb: { xs: 10, md: 10 }
          }}
        >
          <m.div variants={varFade().inDown}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="h2"
                sx={{
                  backgroundcolor: "primary",
                  backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                  // backgroundImage: `linear-gradient(45deg, #1C252E , #D2D4D8)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "repeat",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center"
                }}
              >
                Advanced Capabilities
              </Typography>
              <m.div variants={varFade().inUp}>
                <Typography
                  component="div"
                  sx={{
                    color: isLight ? "text.secondary" : "common.white",
                    textAlign: "center",
                    mb: 4
                  }}
                >
                  Leveraging cutting-edge machine learning algorithms and
                  sophisticated market analysis to deliver unparalleled trading
                  performance.
                </Typography>
              </m.div>
            </Stack>
          </m.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, lg: 3 },
            spacing: { xs: 2, lg: 2 },
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle
                className={
                  (index === 0 && "cardLeft") ||
                  (index === 1 && "cardCenter") ||
                  (index === 2 && "cardLeft")
                  // (index === 4 && "cardLeft")
                  // (index === 5 && "cardLeft")
                }
              >
                {/* <CardStyle> */}
                <Box
                  sx={{
                    mb: 3,
                    // mx: "auto",
                    width: 32,
                    height: 32,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main)
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main)
                    })
                  }}
                >
                  {card.icon}
                </Box>

                <Typography variant="h6" paragraph sx={{ textAlign: "start" }}>
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    color: isLight ? "text.secondary" : "common.white",
                    textAlign: "start"
                  }}
                >
                  {card.description}
                </Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
