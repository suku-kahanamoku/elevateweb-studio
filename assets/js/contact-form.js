document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (!form) return;

  const statusEl = document.createElement("p");
  statusEl.className = "form-status text-sm mt-3 font-medium";
  statusEl.setAttribute("role", "status");
  statusEl.textContent = "We will get back to you shortly.";

  form.appendChild(statusEl);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.innerHTML || "Submit Request";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
      submitButton.classList.remove("bg-primary-container", "bg-red-600");
      submitButton.classList.add("bg-green-600");
    }

    statusEl.textContent = "Sending message…";
    statusEl.classList.remove("text-red-400", "text-primary-fixed");
    statusEl.classList.add("text-on-surface-variant");

    const payload = {
      name: document.getElementById("name")?.value || "",
      email: document.getElementById("email")?.value || "",
      project: document.getElementById("project")?.value || "",
      message: document.getElementById("message")?.value || "",
    };

    const endpoint =
      window.location.protocol === "file:"
        ? "http://127.0.0.1:3000/api/contact-form"
        : "/api/contact-form";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || data.error || "Failed to send message",
        );
      }

      form.reset();
      statusEl.textContent = data.message || "Message sent successfully.";
      statusEl.classList.remove("text-on-surface-variant", "text-red-400");
      statusEl.classList.add("text-primary-fixed");
    } catch (error) {
      statusEl.textContent = error.message || "Something went wrong.";
      statusEl.classList.remove(
        "text-on-surface-variant",
        "text-primary-fixed",
      );
      statusEl.classList.add("text-red-400");

      if (submitButton) {
        submitButton.classList.remove("bg-green-600", "bg-primary-container");
        submitButton.classList.add("bg-red-600");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        submitButton.classList.remove("bg-green-600", "bg-red-600");
        submitButton.classList.add("bg-primary-container");
      }
    }
  });
});
