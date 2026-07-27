import { apiContactForm } from "./api/contact.js";

const API_ROUTES = {
  "/api/contact": apiContactForm,
};

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const { pathname } = requestUrl;

    const apiHandler = API_ROUTES[pathname];
    if (apiHandler) {
      return apiHandler(request, env, requestUrl);
    }

    return env.ASSETS.fetch(request);
  },
};
