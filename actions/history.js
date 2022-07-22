import axios from "axios";

export const createHistory = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/history`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getHistoryList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/history`,
  }).then((res) => {
    return res.data;
  });
};

export const updateHistory = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/history`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeHistory = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/history/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
