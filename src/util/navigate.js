import { intervalCollection } from "time-events-manager";

const navigate = (navigate, path, message) => {
  if (message) {
    console.log(message);
  }
  intervalCollection.removeAll();
  navigate(path);
};

export default navigate;
