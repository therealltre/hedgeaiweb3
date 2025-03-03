// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  chat: getIcon("ic_chat"),
  dashboard: getIcon("ic_bot"),
  portfolio: getIcon("ic_briefcase"),
  farms: getIcon("ic_chart")
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "Trading Bot",
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: "My Portfolio",
        path: PATH_DASHBOARD.general.porfolio,
        icon: ICONS.portfolio
      },
      {
        title: "Farms",
        path: PATH_DASHBOARD.general.farms,
        icon: ICONS.farms
      }
    ]
  }

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: "app",
  //   items: [{ title: "chat", path: PATH_DASHBOARD.chat.root, icon: ICONS.chat }]
  // }
];

export default navConfig;
