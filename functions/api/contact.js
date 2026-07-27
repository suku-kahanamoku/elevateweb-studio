const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function buildBackendUrl(env) {
  const backendBaseUrl = env.BACKEND_URL;
  const backendPath = env.BACKEND_PATH || "/mailer";

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

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function onRequestPost(context) {
  const backendUrl = buildBackendUrl(context.env);

  if (!backendUrl) {
    return jsonResponse(
      {
        success: false,
        error: "Missing BACKEND_URL Pages variable",
      },
      500,
    );
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: await context.request.text(),
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

export function onRequest() {
  return jsonResponse(
    {
      success: false,
      error: "Method not allowed",
    },
    405,
  );
}
