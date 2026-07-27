import { CORS_HEADERS, buildBackendUrl, jsonResponse } from "./utils.js";

export async function apiContactForm(request, env, requestUrl) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (request.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed",
      },
      405,
    );
  }

  const backendUrl = buildBackendUrl(env, "/api/mailer");

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
