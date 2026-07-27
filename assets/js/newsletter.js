document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");

  if (!form) return;

  const emailInput = document.getElementById("newsletter-email");
  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = document.createElement("p");

  statusEl.className = "text-sm mt-3 font-medium text-on-surface-variant";
  statusEl.setAttribute("role", "status");

  form.appendChild(statusEl);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput?.value?.trim() || "";
    if (!email) {
      statusEl.textContent = "Email is required.";
      statusEl.classList.remove(
        "text-primary-fixed",
        "text-on-surface-variant",
      );
      statusEl.classList.add("text-red-400");
      return;
    }

    const originalButtonContent = submitButton?.innerHTML || "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("opacity-70");
    }

    statusEl.textContent = "Sending subscription…";
    statusEl.classList.remove("text-red-400", "text-primary-fixed");
    statusEl.classList.add("text-on-surface-variant");

    const endpoint =
      window.location.protocol === "file:"
        ? "http://127.0.0.1:3000/api/newsletter"
        : "/api/newsletter";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || data.error || "Failed to subscribe to newsletter",
        );
      }

      form.reset();
      statusEl.textContent =
        data.message || "Thanks. Your newsletter request has been sent.";
      statusEl.classList.remove("text-red-400", "text-on-surface-variant");
      statusEl.classList.add("text-primary-fixed");
    } catch (error) {
      statusEl.textContent = error.message || "Something went wrong.";
      statusEl.classList.remove(
        "text-primary-fixed",
        "text-on-surface-variant",
      );
      statusEl.classList.add("text-red-400");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove("opacity-70");
        submitButton.innerHTML = originalButtonContent;
      }
    }
  });
});
