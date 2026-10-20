/* =========================================================
   Secret Recipes Restaurant — shared script
   ========================================================= */

/* ---------------------------------------------------------
   Weekly specials data.
   Edit this array to update the Specials page each week —
   no HTML changes needed.
   --------------------------------------------------------- */
const SPECIALS = [
  {
    category: "starters",
    name: "Roasted Beet & Goat Cheese Salad",
    description: "Heirloom beets, whipped goat cheese, candied walnuts and a citrus vinaigrette.",
    price: "$12",
  },
  {
    category: "starters",
    name: "Charred Octopus",
    description: "Smoked paprika, crispy potatoes, salsa verde and lemon.",
    price: "$16",
  },
  {
    category: "starters",
    name: "Wild Mushroom Soup",
    description: "Slow-simmered forest mushrooms finished with truffle oil and chives.",
    price: "$10",
  },
  {
    category: "mains",
    name: "Pan-Seared Duck Breast",
    description: "Served with a cherry-port reduction, roasted root vegetables and potato puree.",
    price: "$28",
  },
  {
    category: "mains",
    name: "Braised Short Rib",
    description: "48-hour braise with red wine jus, creamy polenta and crispy shallots.",
    price: "$26",
  },
  {
    category: "mains",
    name: "Pan-Roasted Halibut",
    description: "Saffron beurre blanc, charred leeks and a herb-crusted potato cake.",
    price: "$30",
  },
  {
    category: "desserts",
    name: "Dark Chocolate Fondant",
    description: "Molten centre, salted caramel ice cream and candied hazelnuts.",
    price: "$9",
  },
  {
    category: "desserts",
    name: "Spiced Pear Tart",
    description: "Buttery pastry, mascarpone cream and a cinnamon crumble.",
    price: "$8",
  },
];

/* ---------------------------------------------------------
   Mobile hamburger menu
   --------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("hamburger");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------------------------------------------------------
   Footer copyright year
   --------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------
   Render Specials page cards from the SPECIALS array
   --------------------------------------------------------- */
function renderSpecials() {
  const groups = {
    starters: document.getElementById("starters-grid"),
    mains: document.getElementById("mains-grid"),
    desserts: document.getElementById("desserts-grid"),
  };

  if (!groups.starters && !groups.mains && !groups.desserts) return;

  SPECIALS.forEach((item) => {
    const container = groups[item.category];
    if (!container) return;

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <span class="price-tag">${item.price}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* ---------------------------------------------------------
   Generic AJAX form submission to Formspree
   (works for both the reservation and contact forms)
   --------------------------------------------------------- */
function submitFormToFormspree(form, messageEl) {
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        messageEl.textContent = form.dataset.successMessage || "Thank you! Your message has been sent.";
        messageEl.className = "form-message success";
        form.reset();
      } else {
        messageEl.textContent = "Something went wrong submitting the form. Please try again or call us directly.";
        messageEl.className = "form-message error";
      }
    })
    .catch(() => {
      messageEl.textContent = "Something went wrong submitting the form. Please try again or call us directly.";
      messageEl.className = "form-message error";
    });
}

function showFieldError(field, message) {
  const wrapper = field.closest(".form-field");
  if (!wrapper) return;
  const errorEl = wrapper.querySelector(".field-error");
  wrapper.classList.add("has-error");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(field) {
  const wrapper = field.closest(".form-field");
  if (!wrapper) return;
  wrapper.classList.remove("has-error");
}

/* ---------------------------------------------------------
   Reservation form: validation + submit
   --------------------------------------------------------- */
function initReservationForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  const messageEl = document.getElementById("reservation-message");
  const dateField = form.querySelector("#res-date");
  const timeField = form.querySelector("#res-time");

  // Prevent choosing a date before today.
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  dateField.setAttribute("min", todayStr);

  const OPEN_TIME = "11:30";
  const CLOSE_TIME = "22:00";
  timeField.setAttribute("min", OPEN_TIME);
  timeField.setAttribute("max", CLOSE_TIME);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    form.querySelectorAll("[required]").forEach((field) => {
      clearFieldError(field);
      if (!field.value || !field.value.trim()) {
        showFieldError(field, "This field is required.");
        isValid = false;
      }
    });

    // Date must not be in the past.
    if (dateField.value) {
      clearFieldError(dateField);
      if (dateField.value < todayStr) {
        showFieldError(dateField, "Please choose today or a future date.");
        isValid = false;
      }
    }

    // Time must fall within opening hours.
    if (timeField.value) {
      clearFieldError(timeField);
      if (timeField.value < OPEN_TIME || timeField.value > CLOSE_TIME) {
        showFieldError(timeField, `Please choose a time between ${OPEN_TIME} and ${CLOSE_TIME}.`);
        isValid = false;
      }
    }

    // Guests must be between 1 and 12.
    const guestsField = form.querySelector("#res-guests");
    if (guestsField.value) {
      clearFieldError(guestsField);
      const guests = Number(guestsField.value);
      if (guests < 1 || guests > 12) {
        showFieldError(guestsField, "Please enter a number of guests between 1 and 12.");
        isValid = false;
      }
    }

    // Basic email format check (browser already validates type="email").
    const emailField = form.querySelector("#res-email");
    if (emailField.value && !emailField.checkValidity()) {
      showFieldError(emailField, "Please enter a valid email address.");
      isValid = false;
    }

    if (!isValid) {
      messageEl.textContent = "Please fix the highlighted fields and try again.";
      messageEl.className = "form-message error";
      return;
    }

    submitFormToFormspree(form, messageEl);
  });
}

/* ---------------------------------------------------------
   Contact form: validation + submit
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const messageEl = document.getElementById("contact-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    form.querySelectorAll("[required]").forEach((field) => {
      clearFieldError(field);
      if (!field.value || !field.value.trim()) {
        showFieldError(field, "This field is required.");
        isValid = false;
      }
    });

    const emailField = form.querySelector("#contact-email");
    if (emailField.value && !emailField.checkValidity()) {
      showFieldError(emailField, "Please enter a valid email address.");
      isValid = false;
    }

    if (!isValid) {
      messageEl.textContent = "Please fix the highlighted fields and try again.";
      messageEl.className = "form-message error";
      return;
    }

    submitFormToFormspree(form, messageEl);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initFooterYear();
  renderSpecials();
  initReservationForm();
  initContactForm();
});
