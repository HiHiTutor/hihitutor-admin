import { fetchUtils } from "react-admin";

const apiUrl = process.env.REACT_APP_API_BASE_URL || 'https://hihitutor-backend.onrender.com/api';

const httpClient = async (url, options = {}) => {
  options.headers = new Headers(options.headers || {});

  let authToken = localStorage.getItem("authToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (!authToken || authToken === "undefined" || authToken === "null") {
    console.warn("⚠️ Token 無效，請重新登入");
    return Promise.reject(new Error("未授權，請重新登入"));
  }

  authToken = authToken.replace(/['"]+/g, "");
  options.headers.set("Authorization", `Bearer ${authToken}`);
  options.headers.set("Content-Type", "application/json");

  try {
    const response = await fetchUtils.fetchJson(url, options);
    return response;
  } catch (error) {
    if (error.status === 401) {
      console.error("❌ 401 Unauthorized - Token 可能無效");
      if (refreshToken) {
        console.log("🔄 嘗試使用 Refresh Token 獲取新 Token");
        try {
          const refreshResponse = await fetch(`${apiUrl}/users/refresh-token`, {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
            headers: { "Content-Type": "application/json" },
          });

          if (!refreshResponse.ok) {
            throw new Error("Refresh Token 無效");
          }

          const refreshData = await refreshResponse.json();
          const newToken = refreshData.token;
          console.log("✅ Token 刷新成功，重新發送請求");

          localStorage.setItem("authToken", newToken);
          options.headers.set("Authorization", `Bearer ${newToken}`);
          return fetchUtils.fetchJson(url, options);
        } catch (refreshError) {
          console.error("❌ Refresh Token 無效，登出用戶");
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(new Error("未授權，請重新登入"));
        }
      } else {
        console.error("⚠️ 沒有 Refresh Token，登出用戶");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(new Error("未授權，請重新登入"));
      }
    }
    throw error;
  }
};

const dataProvider = {
  getList: async (resource, params) => {
    const { field = "createdAt", order = "DESC" } = params.sort;
    const sortQuery = `sortField=${field}&sortOrder=${order}`;

    let url;
    switch (resource) {
      case "student_cases":
        url = `${apiUrl}/cases?postType=student-seeking-tutor&${sortQuery}`;
        break;
      case "tutor_cases":
        url = `${apiUrl}/cases?postType=tutor-seeking-student&${sortQuery}`;
        break;
      case "pending_cases":
        url = `${apiUrl}/cases/pending?${sortQuery}`;
        break;
      case "users":
        url = `${apiUrl}/users?${sortQuery}`;
        break;
      default:
        console.warn(`❌ 無法識別的 resource: ${resource}`);
        return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    console.log(`📌 dataProvider.getList(resource: ${resource}) => ${url}`);

    try {
      const { json } = await httpClient(url);
      if (!json || !Array.isArray(json)) {
        throw new Error(`❌ 無效的 API 回應: ${JSON.stringify(json)}`);
      }

      return {
        data: json.map((item) => ({
          id: item._id || item.id,
          ...item,
        })),
        total: json.length,
      };
    } catch (error) {
      console.error(`❌ dataProvider.getList(${resource}) 發生錯誤:`, error);
      return { data: [], total: 0 };
    }
  },

  getOne: async (resource, params) => {
    let url;

    switch (resource) {
      case "users":
        url = `${apiUrl}/users/${params.id}`;
        break;
      case "student_cases":
      case "tutor_cases":
      case "pending_cases":
      case "cases":
        url = `${apiUrl}/cases/${params.id}`;
        break;
      default:
        console.warn(`❌ 無法識別的 resource: ${resource}`);
        return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    console.log(`📌 dataProvider.getOne(resource: ${resource}, id: ${params.id}) => ${url}`);

    try {
      const { json } = await httpClient(url);
      if (!json || (!json._id && !json.id)) {
        throw new Error(`❌ 無效的 API 回應: ${JSON.stringify(json)}`);
      }

      return { data: { id: json._id || json.id, ...json } };
    } catch (error) {
      console.error(`❌ dataProvider.getOne(${resource}, ${params.id}) 發生錯誤:`, error);
      return Promise.reject(error);
    }
  },

  update: async (resource, params) => {
    let url;

    switch (resource) {
      case "users":
        url = `${apiUrl}/users/${params.id}`;
        break;
      case "student_cases":
      case "tutor_cases":
      case "pending_cases":
      case "cases":
        url = `${apiUrl}/cases/${params.id}`;
        break;
      default:
        console.warn(`❌ 無法識別的 resource: ${resource}`);
        return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    console.log(`📌 dataProvider.update(resource: ${resource}, id: ${params.id}) => ${url}`);
    console.log("📌 發送更新數據:", params.data);

    try {
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });

      console.log("✅ API 更新回應:", json);

      return { data: { id: json._id || params.id, ...json } };
    } catch (error) {
      console.error(`❌ dataProvider.update(${resource}, ${params.id}) 發生錯誤:`, error);
      return Promise.reject(error);
    }
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/cases`;
    console.log(`📌 dataProvider.create(resource: ${resource}) => ${url}`);
    console.log("📌 發送創建數據:", params.data);

    try {
      const { json } = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      });

      console.log("✅ API 創建回應:", json);

      return { data: { id: json._id || json.id, ...json } };
    } catch (error) {
      console.error(`❌ dataProvider.create(${resource}) 發生錯誤:`, error);
      return Promise.reject(error);
    }
  },

delete: async (resource, params) => {
  let url;

  switch (resource) {
    case "users":
      url = `${apiUrl}/users/${params.id}`;
      break;
    case "student_cases":
    case "tutor_cases":
    case "pending_cases":
    case "cases":
      url = `${apiUrl}/cases/${params.id}`;
      break;
    default:
      console.warn(`❌ 無法識別的 resource: ${resource}`);
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
  }

  console.log(`📌 dataProvider.delete(resource: ${resource}, id: ${params.id}) => ${url}`);

  try {
    await httpClient(url, { method: "DELETE" });
    console.log("✅ API 刪除成功");
    return { data: { id: params.id } };
  } catch (error) {
    console.error(`❌ dataProvider.delete(${resource}, ${params.id}) 發生錯誤:`, error);
    return Promise.reject(error);
  }
},


export default dataProvider;
