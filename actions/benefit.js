import axios from "axios";

export const createBenefit = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/benefit`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getBenefitList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/benefit`,
  }).then((res) => {
    return res.data;
  });
};

export const updateBenefit = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/benefit`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeBenefit = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/benefit/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
