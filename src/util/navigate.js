import { intervalCollection } from "time-events-manager";

export const navigateTo = (navigate, path) => {
  intervalCollection.removeAll();
  navigate(path);
};
