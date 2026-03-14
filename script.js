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

//Rendered features
const features = [
  {
    title: "Explore!",
    category: "Exploration",
    description: "Travel through a procedurally generated world filled with secrets and discoverable locations."
  },
  {
    title: "Build!",
    category: "Crafting",
    description: "Construct your own base, place structures, and shape the environment around you."
  },
  {
    title: "Fight!",
    category: "Combat",
    description: "Defend yourself against hostile creatures and survive dangerous encounters."
  },
  {
    title: "Farm!",
    category: "Survival",
    description: "Grow crops and manage resources to support long-term survival in the world."
  },
  {
    title: "Craft!",
    category: "Crafting",
    description: "Use gathered materials to create tools, equipment, and useful upgrades."
  },
  {
    title: "Discover!",
    category: "Exploration",
    description: "Uncover hidden areas, rare items, and unique surprises during your journey."
  }
];


//Dynamic content rendering
function renderFeatures(featureArray) {
  const featureList = document.getElementById("feature-list");

  if (!featureList) {
    return;
  }

  featureList.innerHTML = "";

  if (featureArray.length === 0) {
    featureList.innerHTML = "<p>No features match your search.</p>";
    return;
  }

  featureArray.forEach(function (feature) {
    const featureCard = document.createElement("article");
    featureCard.classList.add("card");

    const featureTitle = document.createElement("h3");
    featureTitle.textContent = feature.title;

    const featureCategory = document.createElement("p");
    featureCategory.innerHTML = "<strong>Category:</strong> " + feature.category;

    const featureDescription = document.createElement("p");
    featureDescription.textContent = feature.description;

    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureCategory);
    featureCard.appendChild(featureDescription);

    featureList.appendChild(featureCard);
  });
}

//Dynamic filtering/search
let selectedCategory = "All";
let searchTerm = "";

function filterFeatures() {
  let filteredFeatures = features.filter(function (feature) {
    const matchesCategory =
      selectedCategory === "All" || feature.category === selectedCategory;

    const matchesSearch =
      feature.title.toLowerCase().includes(searchTerm) ||
      feature.category.toLowerCase().includes(searchTerm) ||
      feature.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderFeatures(filteredFeatures);
}

renderFeatures(features);

const filterButtons = document.querySelectorAll(".filter-btn");
const featureSearch = document.getElementById("feature-search");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    filterFeatures();
  });
});

if (featureSearch) {
  featureSearch.addEventListener("input", function () {
    searchTerm = featureSearch.value.trim().toLowerCase();
    filterFeatures();
  });
}


//AI-assisted: Used ChatGPT to help with RAWG API fetch logic
//Public API
async function loadFeaturedGame() {
  const gameBox = document.getElementById("game-api");

  if (!gameBox) {
    return;
  }

  const apiKey = "87441e7412a049eea923f65d452e4095";

  gameBox.innerHTML = "<p>Loading featured game...</p>";

  //Fetching
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`
    );

    //Error response
    if (!response.ok) {
      throw new Error("Game request failed.");
    }

    const data = await response.json();
    const games = data.results;

    if (!games || games.length === 0) {
      throw new Error("No games returned.");
    }

    //Generate random
    const randomIndex = Math.floor(Math.random() * games.length);
    const game = games[randomIndex];

    //Retrieve info
    const genres = game.genres.map(function (genre) {
      return genre.name;
    }).join(", ");

    gameBox.innerHTML = `
      <article class="game-api-card">
        <img src="${game.background_image}" alt="${game.name} cover art">
        <h3>${game.name}</h3>
        <p><strong>Released:</strong> ${game.released || "Unknown"}</p>
        <p><strong>Genres:</strong> ${genres || "Unknown"}</p>
        <p><strong>RAWG Rating:</strong> ${game.rating || "N/A"}</p>
      </article>
    `;
  } catch (error) {
    gameBox.innerHTML =
      "<p>Sorry, the featured game could not be loaded right now.</p>";
  }
}

loadFeaturedGame();