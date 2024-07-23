import Route from "./core/types/route";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage1";
import Overview from "./pages/websitePages/Overview";
import Keywords from "./pages/websitePages/KeywordsPage";
import Articles from "./pages/websitePages/Articles";
import HistoryPage from "./pages/websitePages/HistoryPage";
import { UserRole } from "./core/types/userRole";
import WriterSettingsPage from "./pages/websitePages/WriterSettingsPage";
import IntegrationPage from "./pages/websitePages/IntegrationsPage";
import CreateWebsitePage from "./pages/CreateWebsitePage";
import ArticleBuilderPage from "./pages/websitePages/ArticleBuilderPage";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PluginDownloads from "./pages/PluginDownloads";
import UserPreferences from "./pages/companyPages/UserPreferences";
import SubscriptionManage from "./pages/companyPages/SubscriptionManage";
import ComingSoon from "./pages/websitePages/Analytics";
import Scheduler from "./pages/websitePages/Scheduler";
import WordpressPage from "./pages/pluginPages/WordpressPage";
import ArticleEditorPage from "./pages/articlePages/ArticleEditorPage";
import ArticleViewerPage from "./pages/articlePages/ArticleViewerPage";
import TeamPage from "./pages/companyPages/TeamPage";
import CustomPluginPage from "./pages/pluginPages/CustomPluginPage";
import Templates from "./pages/websitePages/Templates";
import SuperAdminAllUsersPage from "./pages/adminPages/SuperAdminPage";
import PerferenceTabsNav from "./components/website/PerferenceTabsNav";
import AutomaticWriterTabsNav from "./components/website/AutomaticWriterTabsNav";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AfterLoginPage from "./pages/AfterLoginPage";
import PublishSettingsPage from "./pages/websitePages/PublishSettingsPage";
import BusinessInfo from "./pages/websitePages/BusinessInfo";
import ErrorPage from "./pages/ErrorPage";
import AfterPaymentPage from "./pages/AfterPaymentPage";
import TopicGeneratorPage from "./pages/freeTools/TopicGeneratorPage";
import DocumentPage from "./pages/documentPage";

const routes: Route[] = [
  {
    path: "/login",
    Page: <LoginPage />,
    displayName: "Login",
  },
  {
    path: "/signup",
    Page: <Signup />,
    displayName: "Signup",
  },
  {
    path: "/complete-signup",
    Page: <VerifyEmailPage />,

    displayName: "Verify Email Address",
    hideGlobalLayout: true,
  },
  {
    path: "/reset-password",
    Page: <ResetPassword />,

    displayName: "Reset Password",
  },
  {
    path: "/update-password",
    Page: <UpdatePassword />,
    isProtected: true,

    hideGlobalLayout: true,
    displayName: "Update Password",
  },
  {
    path: "/company/new",
    Page: <LoginPage />,
  },
  {
    path: "/",
    Page: <AfterLoginPage />,
    isProtected: true,
  },
  {
    path: "/websites",
    Page: <Homepage />,
    isProtected: true,
    hideGlobalLayout: true,
    displayName: "My Websites",
  },
  {
    path: "/support",
    Page: <p>עמוד תמיכה</p>,
    isProtected: true,

    displayName: "Support",
  },

  {
    path: "/websites/:websiteId/team",
    Page: <TeamPage />,
    isProtected: true,

    displayName: "Team",
  },

  {
    path: "/websites/:websiteId/user-preferences/account-settings",
    Page: <UserPreferences />,
    isProtected: true,

    displayName: "User Preferences",

    subMenu: <PerferenceTabsNav />,
  },
  {
    path: "/websites/:websiteId/user-preferences/subscription-manage", //dick
    Page: <SubscriptionManage />,
    isProtected: true,

    displayName: "Subscription manage",

    subMenu: <PerferenceTabsNav />,
  },
  {
    path: "/websites/:websiteId/user-preferences/billing-and-payment",
    Page: <SubscriptionManage />,
    isProtected: true,

    displayName: "Billing information & Payment methods",

    subMenu: <PerferenceTabsNav />,
  },
  {
    path: "/websites/:websiteId/",
    Page: <Overview />,
    isProtected: true,
    displayName: "Website Overview",
  },
  {
    path: "/websites/:websiteId/analytics",
    Page: <ComingSoon />,
    isProtected: true,
    displayName: "Coming Soon",
  },
  {
    path: "/websites/:websiteId/keywords",
    Page: <Keywords />,
    isProtected: true,
    displayName: "Website Keywords",
  },
  {
    path: "/websites/:websiteId/autowriter/writer-settings",
    Page: <WriterSettingsPage />,
    isProtected: true,
    displayName: "Writer Settings",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/websites/:websiteId/autowriter/publish-settings",
    Page: <PublishSettingsPage />,
    isProtected: true,
    displayName: "Publish Settings",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/websites/:websiteId/autowriter/templates",
    Page: <Templates />,
    isProtected: true,
    displayName: "Writer Templates",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/websites/:websiteId/integrations",
    Page: <IntegrationPage />,
    isProtected: true,
    displayName: "Website Integrations",
  },
  {
    path: "/websites/:websiteId/business-info",
    Page: <BusinessInfo />,
    isProtected: true,
    displayName: "Business Information",
  },
  {
    path: "/websites/:websiteId/autowriter/scheduler",
    Page: <Scheduler />,
    isProtected: true,
    displayName: "Writer Scheduler",
    subMenu: <AutomaticWriterTabsNav />,
  },
  {
    path: "/websites/:websiteId/articles",
    Page: <Articles />,
    isProtected: true,
    displayName: "Website Articles",
  },
  {
    path: "/websites/builder",
    Page: <ArticleBuilderPage />,
    isProtected: true,
  },
  {
    path: "/websites/:websiteId/history",
    Page: <HistoryPage />,
    isProtected: true,
    role: UserRole.SUPER_ADMIN,
    displayName: "Writer History",
  },
  {
    path: "/websites/:websiteId/articles/:articleId",
    Page: <ArticleViewerPage />,
    isProtected: false,

    hideGlobalLayout: true,
    displayName: "Preview Article",
  },
  {
    path: "/websites/:websiteId/articles/:articleId/edit",
    Page: <ArticleEditorPage />,
    isProtected: true,

    hideGlobalLayout: true,
    displayName: "Edit Article",
  },
  {
    path: "/websites/:websiteId/document/:documentId",
    Page: <DocumentPage />,
    isProtected: true,
    hideGlobalLayout: true,

    displayName: "document",
  },
  {
    path: "/websites/new",
    Page: <CreateWebsitePage />,
    isProtected: true,
    hideGlobalLayout: true,
    displayName: "Connect Your Website",
  },
  {
    path: "/websites/:websiteId/plugins",
    Page: <PluginDownloads />,
    isProtected: true,
    hideGlobalLayout: false,
  },
  {
    path: "/websites/:websiteId/plugins/wordpress",
    Page: <WordpressPage />,
    isProtected: true,
    hideGlobalLayout: false,
  },
  {
    path: "/websites/:websiteId/cms/custom",
    Page: <CustomPluginPage />,
    isProtected: true,
  },
  {
    path: "/websites/:websiteId/user-preferences/admin/users",
    Page: <SuperAdminAllUsersPage />,
    isProtected: true,

    role: UserRole.SUPER_ADMIN,

    subMenu: <PerferenceTabsNav />,
  },
  {
    path: "/payment/:status",
    Page: <AfterPaymentPage />,
    displayName: "Payment",
    isProtected: true,
    hideGlobalLayout: true,
  },
  {
    path: "/tools/topics",
    Page: <TopicGeneratorPage />,
    displayName: "Generate Topics For Free",
    isProtected: false,
    hideGlobalLayout: true,
  },
  {
    path: "/error",
    Page: <ErrorPage />,
    displayName: "Error",
  },
  {
    path: "*",
    Page: <h1>Oops, this is 404 :(</h1>,
    displayName: "404",
  },
];

export default routes;
