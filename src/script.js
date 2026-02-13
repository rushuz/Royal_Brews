window.addEventListener("scroll", function () {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

document.addEventListener("DOMContentLoaded", () => {
  const ageGate = document.getElementById("age-gate");
  const ageYes = document.getElementById("age-yes");
  const ageNo = document.getElementById("age-no");
  const ageContent = document.querySelector(".age-gate-content");
  const celebZone = document.getElementById("celebration-zone");
  const ageError = document.getElementById("age-error");
  const navIcons = document.querySelectorAll(".nav-link i");

  // --- 2. Initial Age Gate Animation ---
  anime({
    targets: ".age-gate-content",
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 1500,
    easing: "easeOutExpo",
  });

  // --- 3. Age Gate Logic ---
  ageNo.addEventListener("click", () => {
    ageError.classList.remove("d-none");
    anime({
      targets: ".age-gate-content",
      translateX: [-10, 10, -10, 10, 0],
      duration: 400,
      easing: "easeInOutQuad",
    });
  });

  ageYes.addEventListener("click", () => {
    anime({
      targets: ageContent,
      opacity: 0,
      scale: 0.8,
      duration: 500,
      easing: "easeInBack",
      complete: () => {
        ageContent.classList.add("d-none");
        celebZone.classList.remove("d-none");

        let tl = anime.timeline({ easing: "easeOutExpo" });
        tl.add({
          targets: "#celeb-img",
          opacity: [0, 1],
          scale: [0.7, 1],
          translateY: [50, 0],
          duration: 1200,
        })
          .add(
            {
              targets: ".yay-text, .celebrate-msg",
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(200),
            },
            "-=600",
          )
          .add({
            targets: "#age-gate",
            opacity: 0,
            translateY: -1000,
            delay: 2000,
            duration: 1200,
            complete: () => {
              ageGate.style.display = "none";
              triggerSiteAnimations();
            },
          });
      },
    });
  });

  navIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      anime({ targets: icon, scale: 1.2, color: "#c5a059", duration: 300 });
    });
    icon.addEventListener("mouseleave", () => {
      anime({ targets: icon, scale: 1.0, color: "#ffffff", duration: 300 });
    });
  });
});

let isAgeValid = false;

function showAuth(view) {
  const views = ["auth-choice", "auth-login", "auth-signup"];
  views.forEach((v) => {
    const el = document.getElementById(v);
    if (el) el.classList.add("d-none");
  });
  const target = document.getElementById(`auth-${view}`);
  if (target) {
    target.classList.remove("d-none");
    anime({
      targets: target,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
    });
  }
}

function calculateAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  const feedback = document.getElementById("age-feedback");
  const signupBtn = document.getElementById("signup-btn");

  if (age >= 21) {
    feedback.innerHTML = `<span class="text-success small">Age: ${age} (Verified)</span>`;
    isAgeValid = true;
  } else {
    feedback.innerHTML = `<span class="text-danger small">Must be 21+ (Current: ${age})</span>`;
    isAgeValid = false;
  }

  // Update button state immediately
  if (signupBtn) signupBtn.disabled = !isAgeValid;
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const expectedEmail = document.getElementById("login-email").value;
  const expectedPass = document.getElementById("login-pass").value;
  const enteredEmail = document.getElementById("signup-email").value;
  const enteredPass = document.getElementById("signup-pass").value;

  // Check if login fields were actually filled first
  if (!expectedEmail || !expectedPass) {
    alert("Please go to LOGIN first to set your credentials.");
    showAuth("login");
    return;
  }

  if (enteredEmail !== expectedEmail || enteredPass !== expectedPass) {
    alert("Error: Email or Password does not match the login credentials!");
    anime({
      targets: ".modal-content",
      translateX: [-10, 10, -10, 10, 0],
      duration: 400,
      easing: "linear",
    });
    return;
  }

  // Success Sequence
  const modalEl = document.getElementById("loginModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  alert("✅ Account Verified! Welcome to the Royal Brews family.");

  anime({
    targets: "body",
    opacity: [0.5, 1],
    duration: 800,
    easing: "easeInOutQuad",
    complete: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Reveal main content if you have a <main> tag
      const mainContent = document.querySelector("main");
      if (mainContent) mainContent.classList.remove("d-none");
    },
  });
}

function triggerSiteAnimations() {
  anime
    .timeline({ easing: "easeOutExpo" })
    .add({
      targets: ".navbar-brand",
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
    })
    .add(
      {
        targets: ".navbar-nav .nav-item",
        opacity: [0, 1],
        translateY: [-20, 0],
        delay: anime.stagger(100),
      },
      "-=600",
    );
}

// Function for Login Button
function handleLoginSubmit(event) {
  event.preventDefault(); // Stop page reload

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  // Check if fields are filled
  if (email && pass) {
    // 1. Close the Modal
    const modalEl = document.getElementById("loginModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    // 2. Show the specific Welcome Message
    alert("Welcome back, let's explore! ✨");

    revealMainPage();
  }
}

// Helper function to reveal the site content
function revealMainPage() {
  const mainContent = document.querySelector("main");
  if (mainContent) {
    mainContent.classList.remove("d-none");

    // Animate the entrance of the main page
    anime({
      targets: "main",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();

  const modalEl = document.getElementById("loginModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  alert("✅ Account Verified! Welcome to the Royal Brews family.");
  revealMainPage();
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("puzzle-board");
  const solveMessage = document.getElementById("solve-congrats");
  const resetBtn = document.getElementById("reset-puzzle");

  let pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let currentOrder = [];
  let selectedIndex = null;

  function initPuzzle() {
    solveMessage.classList.add("d-none");
    // Shuffle logic
    currentOrder = [...pieces].sort(() => Math.random() - 0.5);
    renderBoard();
  }

  function renderBoard() {
    board.innerHTML = "";
    currentOrder.forEach((pos, index) => {
      const piece = document.createElement("div");
      piece.className = "puzzle-piece";

      // Background Positioning (3x3 grid calculation)
      const x = (pos % 3) * 120;
      const y = Math.floor(pos / 3) * 120;
      piece.style.backgroundPosition = `-${x}px -${y}px`;

      piece.onclick = () => handlePieceClick(index);
      board.appendChild(piece);
    });
  }

  function handlePieceClick(index) {
    if (selectedIndex === null) {
      selectedIndex = index;
      board.children[index].classList.add("piece-selected");
    } else {
      // Swap pieces
      [currentOrder[selectedIndex], currentOrder[index]] = [
        currentOrder[index],
        currentOrder[selectedIndex],
      ];

      selectedIndex = null;
      renderBoard();
      checkWin();
    }
  }

  function checkWin() {
    if (currentOrder.every((val, index) => val === pieces[index])) {
      solveMessage.classList.remove("d-none");
      document.querySelectorAll(".puzzle-piece").forEach((p) => {
        p.style.border = "none";
        p.onclick = null; // Game khatam hone par click disable
      });
      document.querySelector(".puzzle-container").style.borderColor = "#28a745";
    }
  }

  resetBtn.onclick = initPuzzle;
  initPuzzle();
});

function checkWin() {
  if (currentOrder.every((val, index) => val === pieces[index])) {
    // 1. Success message dikhayein
    solveMessage.classList.remove("d-none");

    // 2. Puzzle container ko pakdein
    const container = document.querySelector(".puzzle-container");

    // 3. Gaps khatam karein taaki puri image ek dikhe
    board.classList.add("no-gaps");

    // 4. Animation class add karein (Move up and stable)
    container.classList.add("puzzle-solved-animation");

    // 5. Clicks disable karein
    document.querySelectorAll(".puzzle-piece").forEach((p) => {
      p.onclick = null;
      p.style.cursor = "default";
    });
  }
}

function handleFeedback(event) {
  event.preventDefault(); // Page refresh hone se rokne ke liye

  const form = document.getElementById("experienceForm");
  const successMsg = document.getElementById("feedback-success");

  // Yahan aap real API call kar sakte hain, abhi ke liye hum UI change karenge
  form.classList.add("d-none"); // Form hide karein
  successMsg.classList.remove("d-none"); // Success message dikhayein

  console.log("Feedback received successfully!");
}

document
  .querySelector(".btn-scroll-top")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
