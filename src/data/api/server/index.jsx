import apiServices from "./config";

const Services = {};

Services.login = (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  return apiServices.post("/auth/login", body).then((res) => {
    return res.data;
  });
};

Services.register = (data) => {
  return apiServices.post("/auth/register", data).then((res) => {
    return res.data;
  });
};

Services.getUser = () => {
  return apiServices.get("/users/me").then((res) => {
    return res.data;
  });
};

export default Services;
