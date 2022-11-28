import axios from "axios";
import cookie from "js-cookie";

export const submitApplication = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/internship-application`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getApplicationList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/internship-application`,
  }).then((res) => {
    return res.data;
  });
};

export const readApplication = (slug) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/internship-application/${slug}`,
  }).then((res) => {
    return res.data;
  });
};

export const removeApplication = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/internship-application/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
