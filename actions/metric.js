import axios from "axios";
import cookie from "js-cookie";

export const createMetric = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/metric`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getMetricList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/metric`,
  }).then((res) => {
    return res.data;
  });
};

export const updateMetric = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/metric`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeMetric = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/metric/${slug}`,
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
