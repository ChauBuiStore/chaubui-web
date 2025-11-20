export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  PRODUCT: {
    GET_ALL: "/product",
    GET_BY_ID: (id: string) => `/product/${id}`,
  },
  CATEGORY_GROUP: {
    GET_ALL: "/category-group",
  },
  ORDER: {
    CREATE: "/order",
  },
};
