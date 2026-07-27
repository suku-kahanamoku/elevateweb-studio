export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function buildBackendUrl(env) {
  const backendBaseUrl = env.BACKEND_URL;
  const backendPath = "/api/mailer";

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

export function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}
