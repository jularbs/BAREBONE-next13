import axios from "axios";

export const createFAQ = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/faq`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getFAQList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/faq`,
  }).then((res) => {
    return res.data;
  });
};

export const updateFAQ = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/faq`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeFAQ = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/faq/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getFAQbyLocation = (data) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/faq/${data}`,
  }).then((res) => {
    return res.data;
  });
};
