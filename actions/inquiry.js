import axios from "axios";
import cookie from "js-cookie";

export const createInquiry = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/inquiry`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getInquiryList = (receiver) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/inquiry${
      receiver ? `receiver=${receiver}` : ""
    }`,
  }).then((res) => {
    return res.data;
  });
};

export const readInquiry = (id) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/inquiry/${id}`,
  }).then((res) => {
    return res.data;
  });
};

export const removeInquiry = (token, id) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/inquiry-recipient/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
