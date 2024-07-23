import AppConfig from "../../config/appConfig";

function useGa4Auth(websiteId: string) {
  const onGoogleAnalyticsLogin = () => {
    const clientId =
      "89013921262-8t188j1gpf6686m703bn6970mqape296.apps.googleusercontent.com";

    const redirectUri = AppConfig.serverUrl + `/analytics/callback`;
    const scope = "https://www.googleapis.com/auth/analytics.readonly";

    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&&prompt=consent&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&state=${websiteId}`;

    window.location.href = authUrl;
  };
  const onGoogleAnalyticsLogout = () => {};
  return { onGoogleAnalyticsLogin, onGoogleAnalyticsLogout };
}
export default useGa4Auth;
