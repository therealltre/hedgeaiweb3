// next
import { useRouter } from "next/router";
// @mui
import { alpha, styled, useTheme } from "@mui/material/styles";
import { Box, Button, AppBar, Toolbar, Container, Stack } from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
import useResponsive from "../../hooks/useResponsive";

// config
import { HEADER } from "../../config";
// components
import Label from "../../components/Label";
//

import { PATH_DASHBOARD, PATH_PAGE } from "../../routes/paths";
import LogoImage from "@/components/LogoImage";

// ----------------------------------------------------------------------

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  // height: 24,
  zIndex: -1,
  margin: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.palette.background.default} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px"
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useRouter();

  const isDesktop = useResponsive("up", "md");

  const isHome = pathname === "/";

  // const { user } = useAuth();
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleAvatarClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  // const isPopoverOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)"
      }}
    >
      <StyledToolbar variant="dense" disableGutters>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <LogoImage />

          <Label color="info" sx={{ ml: 1 }}>
            HedgeAI
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          <Stack display={"flex"} direction={"row"} gap={2}>
            <Box sx={{ flexGrow: 1, width: "70px" }} />

            <Button
              variant="contained"
              href={PATH_DASHBOARD.general.app}
              passhref="true"
            >
              Launch App
            </Button>
          </Stack>
        </Container>
      </StyledToolbar>
    </AppBar>
  );
}
