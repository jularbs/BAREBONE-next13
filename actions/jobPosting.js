import axios from "axios";
import cookie from "js-cookie";

export const createJobPosting = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/job-posting`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getJobPostingList = () => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/job-posting`,
  }).then((res) => {
    return res.data;
  });
};

export const updateJobPosting = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/job-posting`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeJobPosting = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/job-posting/${slug}`,
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
