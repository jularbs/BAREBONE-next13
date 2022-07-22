import axios from "axios";

export const createCollaboration = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/collaboration`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getCollaborationList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/collaboration`,
  }).then((res) => {
    return res.data;
  });
};

export const updateCollaboration = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/collaboration`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeCollaboration = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/collaboration/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};
