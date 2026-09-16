// 1. Dynamic Typing Effect (Updated with CV Title)
const textElement = document.getElementById("typing-text");
const phrases = ["Front-End Developer", "Web Developer", "PHP & Node.js Developer", "IT Student @ NTTI"];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    textElement.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 40 : 80);
  }
}
document.addEventListener("DOMContentLoaded", type);

// 2. Dark / Light Theme Toggle
const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-bs-theme", newTheme);
  
  themeToggleBtn.innerHTML = newTheme === "dark" 
    ? '<i class="fa-solid fa-moon"></i>' 
    : '<i class="fa-solid fa-sun text-warning"></i>';
});

// 3. Project Category Filter
const filterButtons = document.querySelectorAll("#filterGroup button");
const projectItems = document.querySelectorAll(".project-card-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectItems.forEach(item => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// 4. Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const alertDiv = document.getElementById("formAlert");
  const nameInput = document.getElementById("contactName");
  const name = nameInput ? nameInput.value : "there";

  alertDiv.innerHTML = `<div class="alert alert-success mt-3" role="alert">
    Message sent successfully! Thank you for reaching out, ${name}.
  </div>`;
  e.target.reset();
  setTimeout(() => alertDiv.innerHTML = "", 4000);
});