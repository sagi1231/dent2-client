import { SelectItem } from "primereact/selectitem";
import { formatUserName } from "../../common/utils/formatUserName";
import { Language } from "../types/language";

const languages = Object.keys(Language).map((l) => {
  return {
    label: formatUserName(l.toLowerCase()),
    value: l,
  } as SelectItem;
});

export default languages;
