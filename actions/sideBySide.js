import axios from "axios";
import cookie from "js-cookie";

export const createSideBySide = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/side-by-side`,
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

export const updateSideBySide = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/side-by-side`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeSideBySide = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/side-by-side/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getSideBySideByLocation = (location) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/side-by-side/${location}`,
  }).then((res) => {
    return res.data;
  });
};
