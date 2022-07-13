import axios from "axios";

export const createLogoShowcase = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/logo-showcase`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getLogoShowcaseList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/logo-showcase`,
  }).then((res) => {
    return res.data;
  });
};

export const updateLogoShowcase = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/logo-showcase`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeLogoShowcase = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/logo-showcase/${slug}`,
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
