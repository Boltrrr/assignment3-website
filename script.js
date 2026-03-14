//ISO-CORE JavaScript
//Assignment 3 - IMD1005
//Ryan Bolt - 2026


//Constants
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("back-to-top");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.getElementById("contact-form");


//Hamburger button for mobile
if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  });
}


//Back to Top button
if (backToTop) {

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


//Accordion FAQ
faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {
    const isOpen = item.classList.contains("active");

    faqItems.forEach(function (faqItem) {
      faqItem.classList.remove("active");
    });

    if (!isOpen) {
      item.classList.add("active");
    }
  });
});


//Form validation
if (contactForm) {

  contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const errors = contactForm.querySelectorAll(".error-message");
    const success = document.getElementById("form-success");

    let valid = true;

    errors.forEach(function(error){
      error.textContent = "";
    });

    success.textContent = "";

    if (name.value.trim() === "") {
      errors[0].textContent = "Please enter your name.";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
      errors[1].textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (message.value.trim().length < 10) {
      errors[2].textContent = "Message must be at least 10 characters.";
      valid = false;
    }

    if (valid) {
      success.textContent = "Thank you, we have received your message.";
      contactForm.reset();
    }
  });
}