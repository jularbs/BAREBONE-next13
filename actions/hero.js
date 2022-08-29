import axios from "axios";
import cookie from "js-cookie";

export const createHero = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/hero`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const updateHero = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/hero`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const readHeroByTypeLocation = (data) => {
  const { type, location } = data;
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/hero/${type}/${location}`,
  }).then((res) => {
    return res.data;
  });
};


export const readByLocation = (location) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/hero/${location}`,
  }).then((res) => {
    return res.data;
  });
};
