export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function buildBackendUrl(env, path) {
  const backendBaseUrl = env.BACKEND_URL;

  if (!backendBaseUrl) {
    return null;
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(
    normalizedPath,
    `${backendBaseUrl.replace(/\/+$/, "")}/`,
  ).toString();
}

export function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}
