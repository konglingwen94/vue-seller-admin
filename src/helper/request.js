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
// 获取食品分类列表
export const fetchFoodsCategoryList = () => instance.get("/menus");
// 更新食品分类

export const updateFoodsCategory = (id, payload) => {
  return instance.patch(`/menus/${id}`, payload);
};
// 新建食品分类

export const createFoodsCategory = (payload) => {
  return instance.post(`/menus/`, payload);
};
// 删除食品分类
export const deleteFoodsCategory = (id) => instance.delete(`/menus/${id}`);
// 食品列表
export const fetchFoodsList = (payload) => instance.get("/foods", { params: payload });
// 更新食品
export const updateOneFoods = (id, payload) => instance.patch(`/foods/${id}`, payload);
// 删除食品
export const deleteFoods = (id) => instance.delete(`/foods/${id}`);
// 添加食品
export const createFoods = (payload) => instance.post("/foods", payload);
export const fetchOneFoods = (id) => instance.get(`/foods/${id}`);

export const deleteUploadedFile=(filename)=>instance.delete(`/uploads/${filename}`)
