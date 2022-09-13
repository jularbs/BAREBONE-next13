import axios from "axios";

export const createOption = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/option`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const readOption = (index) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/option/${index}`,
  }).then((res) => {
    return res.data;
  });
};

export const readOptions = (indices) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/options/?${indices
      .map((value, index) => `indices[${index}]=${value}`)
      .join("&")}`,
  }).then((res) => {
    return res.data;
  });
};

export const removeOption = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/option/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
