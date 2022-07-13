import axios from "axios";
import cookie from "js-cookie";

export const createCategory = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/category-ir`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getCategoryList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/category-ir`,
  }).then((res) => {
    return res.data;
  });
};

export const updateCategory = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/category-ir`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeCategory = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/category-ir/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
