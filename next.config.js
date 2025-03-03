const withTM = require("next-transpile-modules")([
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/list",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline"
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // DEV_API: 'http://localhost:3031',
    // HOST_API_KEY: 'http://localhost:3030',
    // FIREBASE AUTH
    FIREBASE_API_KEY: "",
    FIREBASE_AUTH_DOMAIN: "",
    FIREBASE_PROJECT_ID: "",
    FIREBASE_STORAGE_BUCKET: "",
    FIREBASE_MESSAGING_SENDER_ID: "",
    FIREBASE_APPID: "",
    FIREBASE_MEASUREMENT_ID: "",
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: "",
    AWS_COGNITO_CLIENT_ID: "",
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: "",
    AUTH0_DOMAIN: "",
    //
    MAPBOX: ""
  }
});
