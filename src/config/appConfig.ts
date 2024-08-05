const devMode = process.env.NODE_ENV === "development";

const AppConfig = {
  devMode,
  serverUrl: devMode ? "http://127.0.0.1:3001" : "http://dnet.idf",
  appUrl: devMode ? "http://localhost:3000" : "https://app.ghostwrites.ai",
};
console.log(AppConfig);

export default AppConfig;
