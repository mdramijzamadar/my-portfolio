const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

// Highlight active section link and handle sticky header on scroll
window.onscroll = () => {
  let top = window.scrollY;
  console.log(top);
  console.log("ramij");

  // Loop through each section to check if it's in view
  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    console.log("id", id);

    if (top >= offset && top < offset + height) {
      // Remove active class from all nav links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
        console.log(id);
      });
    }
  });
  /*===========================sticky navbar========================== */
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
  /*===========================remove toggle icon and navbar========================== */
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
  toggleBackToTopButton();
};

// Select DOM elements

console.log(navLinks);

// Toggle navbar on menu icon click
menuIcon.onclick = () => {
  console.log("toggle");
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

// Initialize ScrollReveal animations
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content , heading", { origin: "top" });
ScrollReveal().reveal(".home-img , .portfolio-box, .contact form", {
  origin: "bottom",
});
ScrollReveal().reveal(".home-content h1 , .about-img, .project-container", {
  origin: "left",
});
ScrollReveal().reveal(".home-content p , .about-content, .skill , .netflix", {
  origin: "right",
});

// Initialize Typed.js for text animation
const typed = new Typed(".multiple-text", {
  strings: [
    "Front-end Developer",
    "Back-end Developer",
    "Full Stack Web Developer",
  ],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

function toggleBackToTopButton() {
  const button = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// responsive  ness
function responsiveClass() {
  const container = document.querySelector(".netflix");

  if (window.innerWidth < 991) {
    container.classList.remove("reverse");
  } else {
    container.classList.add("reverse");
  }
}

window.addEventListener("resize", responsiveClass);
responsiveClass();
////////////////////////////////////////////////

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

// Hide loader after page load
window.onload = function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 3000);
};
