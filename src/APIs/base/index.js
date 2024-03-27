import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "Redux/reducers/authSlice";
import { store } from "Redux/store";

const clearLocalStorage = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const performLogout = () => {
  store.dispatch(logout());
  clearLocalStorage();
};

const redirectToLogin = () => {
  performLogout();
  setTimeout(() => {
    window.location = "/login";
  }, 3000);
};

const path = window.location.pathname;

const consoleErrorPerformRedirection = (error) => {
  toast.error(error?.response?.data?.message, {
    position: "top-right",
    autoClose: 2000,
  });
  if (path === "/login") {
    return;
  } else if (error?.response?.status === 401) {
    redirectToLogin();
  };
  // throw error
};

//Get Method
const getMethod = async (
  endpoint,
  authentication = true,
  showError = true,
  data
) => {
  let params = {};
  let bearer_token;
  if (authentication) {
    const { auth } = store.getState();
    bearer_token = auth.accessToken || localStorage.getItem("accessToken");

    params = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        Accept: "application/json",
      },
    };
  }
  if (data) {
    params.params = data;
  }
  return await axios
    .get(endpoint, params)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(endpoint, params);
      if (showError) {
        consoleErrorPerformRedirection(error);
      } else {
        return;
      }
    });
};

// Post Method
const postMethod = async (
  endpoint,
  authentication = true,
  data = null,
  multipart = false,
  showError = true
) => {
  let headers = {};

  console.log("data", data);
  if (authentication) {
    const { auth } = store.getState();
    var bearer_token = auth.accessToken || localStorage.getItem("accessToken");
    headers["Authorization"] = `Bearer ${bearer_token}`;
    headers["Accept"] = "application/json";
  }
  if (multipart) {
    headers["content-type"] = "multipart/form-data";
  }
  console.log([endpoint, data, headers]);
  return await axios
    .post(endpoint, data, { headers })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      if (showError) {
        consoleErrorPerformRedirection(error);
      } else {
        return;
      }
    });
};

// Delete Method
const deleteMethod = async (endpoint, authentication = true, data = null) => {
  let headers = {};
  if (authentication) {
    const { auth } = store.getState();
    var bearer_token = auth.accessToken || localStorage.getItem("accessToken");
    headers["Authorization"] = `Bearer ${bearer_token}`;
    headers["Accept"] = "application/json";
  }
  console.log([endpoint, headers, data]);
  return await axios
    .delete(endpoint, { headers, data })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      consoleErrorPerformRedirection(error);
    });
};

//Patch Method
const patchMethod = async (
  endpoint,
  authentication = true,
  data = null,
  multipart = false
) => {
  let headers = {};
  console.log("Data");
  console.log(data);

  if (authentication) {
    const { auth } = store.getState();
    var bearer_token = auth.accessToken || localStorage.getItem("accessToken");
    headers["Authorization"] = `Bearer ${JSON.parse(bearer_token)}`;
  }
  if (multipart) {
    headers["content-type"] = "multipart/form-data";
  }
  return await axios
    .patch(endpoint, data, { headers })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      consoleErrorPerformRedirection(error);
    });
};

//Patch Method
const putMethod = async (
  endpoint,
  authentication = true,
  data = null,
  multipart = false
) => {
  let headers = {};
  console.log("Data");
  console.log(data);

  if (authentication) {
    const { auth } = store.getState();
    var bearer_token = auth.accessToken || localStorage.getItem("accessToken");
    headers["Authorization"] = `Bearer ${bearer_token}`;
  }
  if (multipart) {
    headers["content-type"] = "multipart/form-data";
  }
  return await axios
    .put(endpoint, data, { headers })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      consoleErrorPerformRedirection(error);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMethod,
  postMethod,
  deleteMethod,
  patchMethod,
  putMethod,
};
