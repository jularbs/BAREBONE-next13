import axios from "axios";

export const createCompanyShowcase = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/company-showcase`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getCompanyShowcaseList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/company-showcase`,
  }).then((res) => {
    return res.data;
  });
};

export const updateCompanyShowcase = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/company-showcase`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeCompanyShowcase = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/company-showcase/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getCompanyShowcaseByLocation = (data) => {
  console.log("ACTIONS: ", data);
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/company-showcase/${data}`,
  }).then((res) => {
    return res.data;
  });
};
