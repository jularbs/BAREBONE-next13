import axios from "axios";
import cookie from "js-cookie";

export const createPortrait = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/portrait`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const updatePortrait = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/portrait`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getPortraitListByGroupLocation = (data) => {
  const { group, location } = data;
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/portrait/${group}/${location}`,
  }).then((res) => {
    return res.data;
  });
};
