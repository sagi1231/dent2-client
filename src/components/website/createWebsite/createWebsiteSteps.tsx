import { CreateWebsiteRequestData } from "../../../core/services/requests/createWebsite/createWebsiteRequestData";
import FormStepType from "../../common/form/types/formStepType";
import BusinessDetails from "./steps/BusinessDetails";
import CreateAudience from "./steps/CreateAudience";

export const createWebsiteSteps: FormStepType<CreateWebsiteRequestData>[] = [
  {
    component: <BusinessDetails />,
    fields: [
      "website.name",
      "website.description",
      "website.url",
      "website.category",
    ],
    nextButtonText: "המשך",
  },
  {
    title: "אז למי אתם פונים?",
    subtitle: "בואו ניצור את קהל היעד הראשון שלכם",
    component: <CreateAudience />,
    fields: ["audience.name", "audience.gender"],
    nextButtonText: "צור עסק",
  },
];
