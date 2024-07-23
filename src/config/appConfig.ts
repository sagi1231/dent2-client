const devMode = process.env.NODE_ENV === "development";

const AppConfig = {
  devMode,
  serverUrl: devMode
    ? "http://localhost:3001"
    : "https://server.ghostwrites.ai",
  appUrl: devMode ? "http://localhost:3000" : "https://app.ghostwrites.ai",
};

export default AppConfig;
