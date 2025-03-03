import { m } from "framer-motion";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Container, Stack, Typography, Grid } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: <Icon icon="la:language" width={40} height={40} />,
    title: "Natural Language Processing Pipeline",
    description:
      "Our advanced NLP pipeline processes trading commands with high accuracy and contextual understanding.",
    points: [
      "Preprocessing of trading commands",
      "Tokenization and sentence splitting",
      "Semantic analysis",
      "Named entity recognition"
    ]
  },
  {
    icon: <Icon icon="eos-icons:performance" width={40} height={40} />,
    title: "High-Performance Infrastructure",
    description:
      "Precisely shaped infrastructure ensures reliable and rapid execution of trading operations.",
    points: [
      "Low-latency execution system",
      "Scalable cloud infrastructure",
      "Load balancing",
      "Real-time monitoring"
    ]
  },
  {
    icon: <Icon icon="mdi:security" width={40} height={40} />,
    title: "Security Framework",
    description:
      "Multi-layered security system protecting user assets and trading operations.",
    points: [
      "End-to-end encryption",
      "Multi-factor authentication",
      "Regular security audits",
      "Advanced threat detection"
    ]
  },
  {
    icon: <Icon icon="fluent-mdl2:analytics-report" width={40} height={40} />,
    title: "Analytics Engine",
    description:
      "Comprehensive analytics system providing real-time insights and performance metrics. (Coming soon)",
    points: [
      "Real-time performance tracking",
      "Custom reporting dashboard",
      "Historical data analysis",
      "Risk metrics calculation"
    ]
  },
  {
    icon: <Icon icon="eos-icons:machine-learning" width={40} height={40} />,
    title: "Machine Learning Core",
    description:
      "Sophisticated machine learning models power our predictive analytics and risk assessment systems. (Coming soon)",
    points: [
      "Predictive market analysis",
      "Automated risk assessment",
      "Pattern recognition",
      "Anomaly detection"
    ]
  }
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  background: "#131B20",
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
    maxWidth: "auto",
    minHeight: 250,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(2, 2, 2),
    // boxShadow: theme.customShadows.z12,
    border: "1px solid #63b8f7",
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor: theme.palette.background.default,
      border: "1px solid #63b8f7"
    }
  };
});

const PointBox = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  fontSize: "0.875rem",
  minHeight: "10px",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1)
  }
}));

// ----------------------------------------------------------------------

export default function HomeLandingTechnical() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 10 }
          }}
        >
          <m.div variants={varFade().inDown}>
            <Stack direction={"column"} spacing={1}>
              <Typography
                variant="h2"
                sx={{
                  backgroundcolor: "primary",
                  backgroundImage: `linear-gradient(45deg, #fff , #367BF5)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "repeat",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Technical Architecture
              </Typography>
            </Stack>
          </m.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, lg: 3 },
            spacing: { xs: 2, lg: 2 },
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle>
                {/* <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 3,
                    width: 40,
                    height: 40,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main)
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main)
                    })
                  }}
                /> */}
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
                <Typography
                  variant="h6"
                  paragraph
                  sx={{ textAlign: "start", color: "common.white" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  sx={{
                    color: "common.white",
                    textAlign: "start",
                    mb: 3
                  }}
                >
                  {card.description}
                </Typography>
                {card.points && (
                  <Grid container spacing={2}>
                    {card.points.map((point, i) => (
                      <Grid item xs={6} key={i}>
                        <PointBox>{point}</PointBox>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
