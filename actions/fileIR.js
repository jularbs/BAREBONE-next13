import axios from "axios";
import cookie from "js-cookie";

export const createFile = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/file-ir`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getFileList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/file-ir`,
  }).then((res) => {
    return res.data;
  });
};

export const updateFile = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/file-ir`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeFile = (token, id) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/file-ir/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getFileListByCategory = (slug) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/file-ir/${slug}`,
  }).then((res) => {
    return res.data;
  });
};
