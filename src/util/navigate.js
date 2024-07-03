import { intervalCollection } from "time-events-manager";

export const navigateTo = (navigate, path, message) => {
  if (message) {
    console.log(message);
  }
  intervalCollection.removeAll();
  navigate(path);
};
