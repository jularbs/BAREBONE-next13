import axios from "axios";

export const getLink = ({ bucket, key }) => {
  return `${process.env.API}/v1/media/display?bucket=${bucket}&key=${key}`;
};
