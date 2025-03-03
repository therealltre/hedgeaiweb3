import { m } from "framer-motion";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Grid, Button, Container, Typography } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionViewport, varFade } from "../../components/animate";
import { PATH_DASHBOARD } from "@/routes/paths";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(24, 0),
  backgroundImage:
    "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)"
}));

const ContentStyle = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
    marginBottom: 0
  }
}));

const ScreenStyle = styled(m.div)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  backgroundColor:
    theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  [theme.breakpoints.up("sm")]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12
  },
  "& img": {
    borderRadius: 8,
    [theme.breakpoints.up("sm")]: {
      borderRadius: 12
    }
  }
}));

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: "-50%", translateY: 40, opacity: 1 }
};
const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 }
};
const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: "50%", translateY: -40, opacity: 1 }
};

// ----------------------------------------------------------------------

export default function HomeLanding() {
  const theme = useTheme();

  const isLight = theme.palette.mode === "light";

  const isRTL = theme.direction === "rtl";

  const screenLeftAnimate = variantScreenLeft;

  const screenCenterAnimate = variantScreenCenter;

  const screenRightAnimate = variantScreenRight;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={5} justifyContent="center">
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ContentStyle>
              <m.div variants={varFade().inUp}>
                <Typography
                  component="div"
                  variant="overline"
                  sx={{ mb: 2, color: "text.disabled" }}
                >
                  AI-Powered Trading Assistant
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="h1" sx={{ mb: 1 }}>
                  Trade Smarter
                </Typography>
              </m.div>
              <m.div variants={varFade().inLeft}>
                <Typography
                  variant="h1"
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
                  with Natural Language
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography
                  sx={{
                    mb: 5,
                    color: isLight ? "text.secondary" : "common.white"
                  }}
                >
                  Execute complex trading strategies on Hyperliquid using simple
                  English commands. Powered by advanced AI for precise and
                  efficient crypto trading.
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Button
                  size="large"
                  color="inherit"
                  variant="outlined"
                  // target="_blank"
                  rel="noopener"
                  href={PATH_DASHBOARD.general.app}
                  passhref="true"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      background: theme.palette.primary.dark
                      // background: "linear-gradient(to right,#48bb78, #4070D5)"
                    }
                  }}
                >
                  Launch App
                </Button>
              </m.div>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={7} dir="ltr">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                justifyContent: "center"
              }}
            >
              {[...Array(3)].map((_, index) => (
                <ScreenStyle
                  key={index}
                  variants={{
                    ...(index === 0 && screenLeftAnimate),
                    ...(index === 1 && screenCenterAnimate),
                    ...(index === 2 && screenRightAnimate)
                  }}
                  transition={{ duration: 0.72, ease: "easeOut" }}
                  sx={{
                    boxShadow: `${isRTL ? -80 : 80}px -40px 80px ${alpha(
                      isLight
                        ? theme.palette.grey[600]
                        : theme.palette.common.black,
                      0.48
                    )}`,
                    ...(index === 0 && {
                      zIndex: 3,
                      position: "absolute"
                    }),
                    ...(index === 1 && { zIndex: 2 }),
                    ...(index === 2 && {
                      zIndex: 1,
                      position: "absolute",
                      boxShadow: "none"
                    })
                  }}
                >
                  <Image
                    disabledEffect
                    alt={`screen ${index + 1}`}
                    src={`/assets/images/home/screen_${
                      isLight ? "light" : "dark"
                    }_${index + 1}.png`}
                  />
                </ScreenStyle>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
