import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});
// console.log(instance);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const fetchFoodsCategoryList = () => instance.get("/menus");
export const updateFoodsCategory = (id, payload) => {
  return instance.patch(`/menus/${id}`, payload);
};
