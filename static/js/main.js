// Theme management
const THEME_KEY = "obedience-theme";
const DEFAULT_THEME = "dark";

function initTheme() {
  // Check localStorage first, then system preference, then default
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : DEFAULT_THEME);

  setTheme(theme);
}

function setTheme(theme) {
  const darkIcon = document.querySelector(".theme-icon-dark");
  const lightIcon = document.querySelector(".theme-icon-light");

  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (darkIcon) darkIcon.style.display = "none";
    if (lightIcon) lightIcon.style.display = "inline";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (darkIcon) darkIcon.style.display = "inline";
    if (lightIcon) lightIcon.style.display = "none";
  }
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

// Initialize theme on load
initTheme();

// Attach theme toggle handler
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleTheme);
  }
});

// Set current year in footer
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;
document.querySelector(".modal-year").textContent = currentYear;

// Simple typing animation for tagline
function typeText(element, text, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Start typing after brief delay - read taglines from data attributes
setTimeout(() => {
  const heroBox = document.querySelector(".hero-box");
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  const tagline1 = heroBox?.dataset.tagline1 || "AI that does what you want";
  const tagline2 = heroBox?.dataset.tagline2 || "The way you want it done";

  typeText(line1, tagline1, 40, () => {
    const period1 = document.createElement("span");
    period1.className = "period";
    period1.textContent = ".";
    line1.appendChild(period1);

    setTimeout(() => {
      typeText(line2, tagline2, 40, () => {
        const period2 = document.createElement("span");
        period2.className = "period";
        period2.textContent = ".";
        line2.appendChild(period2);
      });
    }, 150);
  });
}, 300);

// Modal functionality
(function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.querySelector(".modal-close");
  const clickableBoxes = document.querySelectorAll(".article-box.clickable");

  // Open modal with specific article content
  function openModal(articleId, title) {
    // Hide all article content divs
    const allContent = modalContent.querySelectorAll(".modal-article-content");
    allContent.forEach((content) => {
      content.style.display = "none";
    });

    // Show the selected article content
    const selectedContent = modalContent.querySelector(
      `[data-article-id="${articleId}"]`
    );
    if (selectedContent) {
      selectedContent.style.display = "block";
      modalTitle.textContent = title;
      modalOverlay.classList.add("active");
      document.body.classList.add("modal-open");
      modalOverlay.scrollTop = 0;
    }
  }

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    // Reset scroll position
    setTimeout(() => {
      if (!modalOverlay.classList.contains("active")) {
        const allContent = modalContent.querySelectorAll(
          ".modal-article-content"
        );
        allContent.forEach((content) => {
          content.style.display = "none";
        });
      }
    }, 300); // Match transition duration
  }

  // Attach click handlers to clickable article boxes
  clickableBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      e.preventDefault();
      const articleId = box.getAttribute("data-modal-id");
      const title = box.querySelector(".article-title").textContent;
      openModal(articleId, title);
    });
  });

  // Close button click
  modalClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Backdrop click (clicking outside modal container)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // Prevent clicks inside modal container from closing modal
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });
})();

// Drawer functionality with hover zones
(function () {
  const hoverZones = {
    left: document.querySelector(".hover-zone-left"),
    right: document.querySelector(".hover-zone-right"),
  };

  const drawerOverlays = {
    left: document.querySelector(".drawer-overlay-left"),
    right: document.querySelector(".drawer-overlay-right"),
  };

  const drawerContainers = {
    left: document.querySelector(".drawer-container-left"),
    right: document.querySelector(".drawer-container-right"),
  };

  const drawerCloseButtons = {
    left: document.querySelector(".drawer-close-left"),
    right: document.querySelector(".drawer-close-right"),
  };

  const drawerScrims = {
    left: drawerOverlays.left?.querySelector(".drawer-scrim"),
    right: drawerOverlays.right?.querySelector(".drawer-scrim"),
  };

  // Timers for delayed closing
  const closeTimers = {
    left: null,
    right: null,
  };

  // Open drawer
  function openDrawer(side) {
    // Clear any pending close timer
    if (closeTimers[side]) {
      clearTimeout(closeTimers[side]);
      closeTimers[side] = null;
    }

    const overlay = drawerOverlays[side];
    if (overlay) {
      overlay.classList.add("active");
      document.body.classList.add("modal-open");
    }
  }

  // Close drawer with optional delay
  function closeDrawer(side, delay = 0) {
    if (closeTimers[side]) {
      clearTimeout(closeTimers[side]);
    }

    closeTimers[side] = setTimeout(() => {
      const overlay = drawerOverlays[side];
      if (overlay) {
        overlay.classList.remove("active");
        // Only remove modal-open if no other drawers or modals are open
        const anyDrawerOpen = document.querySelector(".drawer-overlay.active");
        const modalOpen = document.querySelector(".modal-overlay.active");
        if (!anyDrawerOpen && !modalOpen) {
          document.body.classList.remove("modal-open");
        }
      }
      closeTimers[side] = null;
    }, delay);
  }

  // Hover zone handlers
  if (hoverZones.left) {
    hoverZones.left.addEventListener("mouseenter", () => openDrawer("left"));
    hoverZones.left.addEventListener("mouseleave", () => closeDrawer("left", 300));
  }

  if (hoverZones.right) {
    hoverZones.right.addEventListener("mouseenter", () => openDrawer("right"));
    hoverZones.right.addEventListener("mouseleave", () => closeDrawer("right", 300));
  }

  // Keep drawer open when hovering over the drawer itself
  if (drawerContainers.left) {
    drawerContainers.left.addEventListener("mouseenter", () => {
      if (closeTimers.left) {
        clearTimeout(closeTimers.left);
        closeTimers.left = null;
      }
    });
    drawerContainers.left.addEventListener("mouseleave", () => closeDrawer("left", 300));
  }

  if (drawerContainers.right) {
    drawerContainers.right.addEventListener("mouseenter", () => {
      if (closeTimers.right) {
        clearTimeout(closeTimers.right);
        closeTimers.right = null;
      }
    });
    drawerContainers.right.addEventListener("mouseleave", () => closeDrawer("right", 300));
  }

  // Touch gesture support for mobile
  let touchStartX = 0;
  let touchStartY = 0;
  let touchingSide = null;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;

    // Detect edge swipe (within 30px of edge)
    if (touchStartX < 30) {
      touchingSide = "left";
    } else if (touchStartX > window.innerWidth - 30) {
      touchingSide = "right";
    } else {
      touchingSide = null;
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (!touchingSide) return;

    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;

    // Require horizontal swipe (not vertical scroll)
    const touchY = e.touches[0].clientY;
    const deltaY = Math.abs(touchY - touchStartY);
    if (deltaY > Math.abs(deltaX)) {
      touchingSide = null;
      return;
    }

    // Open drawer if swiped enough (50px)
    if (touchingSide === "left" && deltaX > 50) {
      openDrawer("left");
      touchingSide = null;
    } else if (touchingSide === "right" && deltaX < -50) {
      openDrawer("right");
      touchingSide = null;
    }
  });

  document.addEventListener("touchend", () => {
    touchingSide = null;
  });

  // Close button handlers
  if (drawerCloseButtons.left) {
    drawerCloseButtons.left.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer("left", 0);
    });
  }

  if (drawerCloseButtons.right) {
    drawerCloseButtons.right.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer("right", 0);
    });
  }

  // Scrim click handlers
  if (drawerScrims.left) {
    drawerScrims.left.addEventListener("click", () => closeDrawer("left", 0));
  }

  if (drawerScrims.right) {
    drawerScrims.right.addEventListener("click", () => closeDrawer("right", 0));
  }

  // ESC key to close any open drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (drawerOverlays.left?.classList.contains("active")) {
        closeDrawer("left", 0);
      }
      if (drawerOverlays.right?.classList.contains("active")) {
        closeDrawer("right", 0);
      }
    }
  });

  // Prevent clicks inside drawer container from closing drawer
  document.querySelectorAll(".drawer-container").forEach((container) => {
    container.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
})();

// Navigation hamburger menu
(function() {
  const hamburger = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('nav-drawer');
  const closeBtn = document.getElementById('nav-drawer-close');
  const scrim = drawer?.querySelector('.nav-drawer-scrim');

  function openDrawer() {
    if (drawer) {
      drawer.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.remove('active');
      const anyDrawerOpen = document.querySelector('.drawer-overlay.active');
      const modalOpen = document.querySelector('.modal-overlay.active');
      if (!anyDrawerOpen && !modalOpen) {
        document.body.classList.remove('modal-open');
      }
    }
  }

  // Hamburger click
  if (hamburger) {
    hamburger.addEventListener('click', openDrawer);
  }

  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Scrim click
  if (scrim) {
    scrim.addEventListener('click', closeDrawer);
  }

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });
})();
