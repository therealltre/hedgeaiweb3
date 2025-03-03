import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { List, Box, ListSubheader, Button } from "@mui/material";
import { useRouter } from "next/router";

//
import { NavListRoot } from "./NavList";
import axios from "axios";

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter
  })
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Send POST request to logout endpoint using axios
      await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box
      {...other}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        ...(other.sx || {})
      }}
    >
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0
              })
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>
          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list} isCollapse={isCollapse} />
          ))}
        </List>
      ))}

      <Box sx={{ flexGrow: 1 }} />
      {/* Logout Button */}
      <Box sx={{ px: 2, py: 2 }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          fullWidth
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": { backgroundColor: "#d32f2f" }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
