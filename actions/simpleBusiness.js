import axios from "axios";
import cookie from "js-cookie";

export const createSimpleBusiness = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/simple-business`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getSimpleBusinessList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/simple-business`,
  }).then((res) => {
    return res.data;
  });
};

export const updateSimpleBusiness = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/simple-business`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeSimpleBusiness = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/simple-business/${slug}`,
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
