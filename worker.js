const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function buildBackendUrl(env) {
  const backendBaseUrl = env.BACKEND_URL;
  const backendPath = env.BACKEND_PATH || "/api/mailer";

  if (!backendBaseUrl) {
    return null;
  }

  const normalizedPath = backendPath.startsWith("/")
    ? backendPath.slice(1)
    : backendPath;

  return new URL(
    normalizedPath,
    `${backendBaseUrl.replace(/\/+$/, "")}/`,
  ).toString();
}

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url);
    const { pathname } = requestUrl;

    if (request.method === "OPTIONS" && pathname === "/api/contact") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    if (request.method === "POST" && pathname === "/api/contact") {
      const backendUrl = buildBackendUrl(env);

      if (!backendUrl) {
        return jsonResponse(
          {
            success: false,
            error: "Missing BACKEND_URL Worker variable",
          },
          500,
        );
      }

      try {
        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Forwarded-Host": requestUrl.host,
            "X-Original-Host": requestUrl.host,
            "X-Forwarded-Proto": requestUrl.protocol.replace(":", ""),
          },
          body: await request.text(),
        });

        const responseText = await response.text();

        return new Response(
          responseText ||
            JSON.stringify({
              success: response.ok,
              message: response.ok
                ? "Message sent successfully."
                : "Backend returned an error",
            }),
          {
            status: response.status || (response.ok ? 200 : 500),
            headers: {
              "Content-Type":
                response.headers.get("content-type") || "application/json",
              ...CORS_HEADERS,
            },
          },
        );
      } catch (error) {
        return jsonResponse(
          {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            backendUrl,
          },
          502,
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
