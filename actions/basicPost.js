import axios from "axios";

export const createBasicPost = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/basic-post`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getBasicPostList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/basic-post`,
  }).then((res) => {
    return res.data;
  });
};

export const updateBasicPost = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/basic-post`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeBasicPost = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/basic-post/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getBasicPostByLocation = (data) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/basic-post/${data}`,
  }).then((res) => {
    return res.data;
  });
};
