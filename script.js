document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const form = document.getElementById("contactForm");
  if (!form) return;

  const get = (id) => document.getElementById(id);
  const setError = (id, message) => {
    get(id).textContent = message;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ["nameError", "emailError", "messageError"].forEach((id) => setError(id, ""));
    get("successMessage").textContent = "";

    const name = get("name").value.trim();
    const email = get("email").value.trim();
    const message = get("message").value.trim();
    let valid = true;

    if (name.length < 2) {
      setError("nameError", "Please enter your name.");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("emailError", "Please enter a valid email address.");
      valid = false;
    }
    if (message.length < 10) {
      setError("messageError", "Please write at least 10 characters.");
      valid = false;
    }
    if (!valid) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    get("successMessage").textContent = "Opening your email app with the message ready to send.";
    window.location.href = `mailto:jeevan9035907633@gmail.com?subject=${subject}&body=${body}`;
  });
});
