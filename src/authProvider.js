const authProvider = {
  // 登入：將 token 存入 localStorage
 login: async ({ username, password }) => {
  const loginUrl = "https://hihitutor-backend.onrender.com/api/users/login";

  const res = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: username, password }),
  });

  if (!res.ok) {
    throw new Error("登入失敗");
  }

  const data = await res.json();
  localStorage.setItem("authToken", data.token);
  },

  logout: () => {
    localStorage.removeItem("authToken"); // ✅ 同樣改 key
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("authToken") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("authToken"); // ✅ 同樣改 key
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),

  // ✅ 提供 token 給 httpClient 使用
  getToken: () => localStorage.getItem("authToken"),
};

export default authProvider;
