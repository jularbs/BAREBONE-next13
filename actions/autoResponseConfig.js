import axios from "axios";

export const createAutoResponseConfig = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/auto-response-config`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getAutoResponseConfig = (id) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/auto-response-config/${id}`,
  }).then((res) => {
    return res.data;
  });
};
