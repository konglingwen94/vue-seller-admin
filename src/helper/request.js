import axios from "axios";

export const instance = axios.create({
  baseURL: "/api/admin",
});
function getToken() {
  var token = localStorage.getItem("token");
  return { token };
}

instance.interceptors.request.use(
  (config) => {
    const { token } = getToken();
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }

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
    if (err.response) {
      if (err.response.status === 403) {
        window.location.href = "/admin/auth/login";
      }
      if (err.response.data) {
        return Promise.reject(err.response.data);
      }
      return Promise.reject(err.response);
    }
    return Promise.reject(err);
  }
);
// 获取食品分类列表
export const fetchFoodsCategoryList = () => instance.get("/menus");
// 更新食品分类

export const updateOneFoodsCategory = (id, payload) => {
  return instance.patch(`/menus/${id}`, payload);
};
// 新建食品分类

export const createOneFoodsCategory = (payload) => {
  return instance.post(`/menus/`, payload);
};
// 删除食品分类
export const deleteOneFoodsCategory = (id) => instance.delete(`/menus/${id}`);
// 食品列表
export const fetchFoodsList = (payload) => instance.get("/foods", { params: payload });
// 更新食品
export const updateOneFoods = (id, payload) => instance.patch(`/foods/${id}`, payload);
// 删除食品
export const deleteOneFoods = (id) => instance.delete(`/foods/${id}`);
// 添加食品
export const createOneFoods = (payload) => instance.post("/foods", payload);
export const fetchOneFoods = (id) => instance.get(`/foods/${id}`);

export const enableOneFood=(id)=>instance.patch(`/foods/${id}/enable`)
export const disableOneFood=(id)=>instance.patch(`/foods/${id}/disable`)

// 删除已上传到服务器的文件
export const deleteUploadedFile = (filename) => instance.delete(`/uploads/${filename}`);


//获取评价列表
export const fetchRatings = (payload) => instance.get("/ratings", { params: payload });
//删除评价
export const deleteOneRating = (id) => instance.delete(`/ratings/${id}`);
//批量删除评价
export const deleteManyRatings = (payload) => instance.post(`/ratings`, payload);
// 店铺管理

export const fetchSeller = () => instance.get("/seller");
export const fetchFoodsStatistic = (payload) => instance.get("/food-statistic", { params: payload });
export const updateSeller = (id, payload) => instance.patch(`/seller/${id}`, payload);

// 修改密码

export const updatePassword = (id, payload) =>
  instance.patch(`/administrators/${id}/change-password`, payload);
// 修改账户信息

export const updateAccount = (id, payload) => instance.patch(`/administrators/${id}/change-account`, payload);
// 登录
export const login = (payload) => instance.post("/administrators/login", payload);

export const fetchAdministratorList = (payload) => instance.get("/administrators", { params: payload });
