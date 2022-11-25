import axios from "axios";
import cookie from "js-cookie";

export const createRecipient = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/inquiry-recipient`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getRecipientList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/inquiry-recipient`,
  }).then((res) => {
    return res.data;
  });
};

export const updateRecipient = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/inquiry-recipient`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeRecipient = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/inquiry-recipient/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
