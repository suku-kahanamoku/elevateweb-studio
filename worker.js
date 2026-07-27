import { apiContactForm } from "./api/contact-form.js";
import { apiNewsletter } from "./api/newsletter.js";

const API_ROUTES = {
  "/api/contact-form": apiContactForm,
  "/api/newsletter": apiNewsletter,
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
