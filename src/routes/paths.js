// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password")
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  page404: "/404",
  page500: "/500"
};

//main-dashboard-----------------------------------------------------
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    porfolio: path(ROOTS_DASHBOARD, "/porfolio"),
    farms: path(ROOTS_DASHBOARD, "/farms")
  },

  // portfolio: {
  //   root: path(ROOTS_DASHBOARD, "/portfolio"),
  //   new: path(ROOTS_DASHBOARD, "/portfolio/new"),
  //   view: (name) => path(ROOTS_DASHBOARD, `/portfolio/${name}`)
  // },

  chat: {
    root: path(ROOTS_DASHBOARD, "/chat"),
    new: path(ROOTS_DASHBOARD, "/chat/new"),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`)
  }
};
