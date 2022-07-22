import axios from "axios";

export const createTestimonial = (token, data) => {
  return axios({
    method: "POST",
    url: `${process.env.API}/v1/testimonial`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const updateTestimonial = (token, data) => {
  return axios({
    method: "PUT",
    url: `${process.env.API}/v1/testimonial`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const removeTestimonial = (token, slug) => {
  return axios({
    method: "DELETE",
    url: `${process.env.API}/v1/testimonial/${slug}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data;
  });
};

export const getTestimonialByLocation = (data) => {
  return axios({
    method: "GET",
    url: `${process.env.API}/v1/testimonial/${data}`,
  }).then((res) => {
    return res.data;
  });
};
