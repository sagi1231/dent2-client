export const formatUserName = (name?: string) => {
  return name ? name[0].toLocaleUpperCase() + name.slice(1) : "";
};
