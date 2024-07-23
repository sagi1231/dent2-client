export const getPreviousPath = (route: string): string => {
  const pathSegments = route.split("/");
  if (pathSegments.length > 1) {
    pathSegments.pop();
  }
  return pathSegments.join("/");
};
