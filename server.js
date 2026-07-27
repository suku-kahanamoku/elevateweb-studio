const http = require("http");

const PORT = process.env.PORT || 3000;
const BACKEND_BASE_URL =
  process.env.BACKEND_URL || "http://localhost/php/php-core/api";
const BACKEND_PATH = process.env.BACKEND_PATH || "/mailer";
const normalizedPath = BACKEND_PATH.startsWith("/")
  ? BACKEND_PATH.slice(1)
  : BACKEND_PATH;
const BACKEND_URL = new URL(
  normalizedPath,
  `${BACKEND_BASE_URL.replace(/\/+$/, "")}/`,
).toString();

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/contact") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        console.log("Forwarding payload to", BACKEND_URL);

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        const responseText = await response.text();

        if (!response.ok) {
          res.writeHead(response.status || 500, {
            "Content-Type":
              response.headers.get("content-type") || "application/json",
          });
          res.end(responseText || JSON.stringify({ success: false, message: "Backend returned an error" }));
          return;
        }

        res.writeHead(response.status || 200, {
          "Content-Type":
            response.headers.get("content-type") || "application/json",
        });
        res.end(responseText);
      } catch (error) {
        console.error("Contact proxy error:", error.message);
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: error.message,
            backendUrl: BACKEND_URL,
          }),
        );
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Contact proxy server running on http://localhost:${PORT}`);
});
