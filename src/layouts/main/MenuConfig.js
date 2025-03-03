// routes
import { PATH_PAGE } from "../../routes/paths";

import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: "Home",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: "/"
  }
  // {
  //   title: 'About Us',
  //   icon: <Iconify icon={'material-symbols:note-outline'} {...ICON_SIZE} />,
  //   path: PATH_PAGE.about,
  // },

  // {
  //   title: 'Login',
  //   icon: <Iconify icon={'ic:round-login'} {...ICON_SIZE} />,
  //   path: PATH_AUTH.login,
  // },
];

export default menuConfig;
