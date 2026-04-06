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
const yearEl = document.getElementById("year");
const modalYearEl = document.querySelector(".modal-year");
if (yearEl) yearEl.textContent = currentYear;
if (modalYearEl) modalYearEl.textContent = currentYear;

// Simple typing animation for tagline with sentence pause
function typeText(element, text, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      const currentChar = text.charAt(i);
      const nextChar = text.charAt(i + 1);
      i++;
      // Add longer pause after sentence-ending punctuation followed by space
      if ((currentChar === '.' || currentChar === '!' || currentChar === '?') && nextChar === ' ') {
        setTimeout(type, 800);
      } else {
        setTimeout(type, speed);
      }
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Start typing after brief delay - read taglines from data attributes
setTimeout(() => {
  const landingHero = document.querySelector(".landing-hero");
  const heroBox = document.querySelector(".hero-box");
  const pageTaglines = document.querySelector(".page-taglines");
  const dataSource = landingHero || heroBox || pageTaglines;
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  const tagline1 = dataSource?.dataset.tagline1 || "";
  const tagline2 = dataSource?.dataset.tagline2 || "";
  const shouldAnimate = dataSource?.dataset.animate === "true";

  if (!line1) return;

  if (shouldAnimate) {
    typeText(line1, tagline1, 70, () => {
      const lastChar1 = tagline1.slice(-1);
      if (!['.', ',', '!', '?', ';', ':'].includes(lastChar1)) {
        const period1 = document.createElement("span");
        period1.className = "period";
        period1.textContent = ".";
        line1.appendChild(period1);
      }

      if (tagline2 && line2) {
        setTimeout(() => {
          typeText(line2, tagline2, 70, () => {
            const lastChar2 = tagline2.slice(-1);
            if (!['.', ',', '!', '?', ';', ':'].includes(lastChar2)) {
              const period2 = document.createElement("span");
              period2.className = "period";
              period2.textContent = ".";
              line2.appendChild(period2);
            }
          });
        }, 150);
      }
    });
  } else {
    const needsPeriod1 = tagline1 && !['.', ',', '!', '?', ';', ':'].includes(tagline1.slice(-1));
    line1.textContent = tagline1 + (needsPeriod1 ? "." : "");

    if (tagline2 && line2) {
      const needsPeriod2 = !['.', ',', '!', '?', ';', ':'].includes(tagline2.slice(-1));
      line2.textContent = tagline2 + (needsPeriod2 ? "." : "");
    }
  }
}, 300);

// Scroll fade-in animation with Intersection Observer
(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sections = document.querySelectorAll(".fade-in-section");

  if (prefersReducedMotion) {
    // If user prefers reduced motion, show everything immediately
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

// Article layout: group same-row single-column articles into two-column rows
(function () {
  const container = document.querySelector(".page-header + .container");
  if (!container) return;

  const articles = Array.from(container.querySelectorAll(".article-box"));
  if (!articles.length) return;

  // Parse grid placement from inline styles
  function parseGridInfo(el) {
    const style = el.getAttribute("style") || "";
    const colMatch = style.match(/grid-column:\s*([^;]+)/);
    const rowMatch = style.match(/grid-row:\s*([^;]+)/);
    return {
      col: colMatch ? colMatch[1].trim() : "",
      row: rowMatch ? rowMatch[1].trim() : "",
    };
  }

  // Group articles by their grid-row
  const rowGroups = {};
  articles.forEach((article) => {
    const info = parseGridInfo(article);
    const rowKey = info.row || "auto";
    if (!rowGroups[rowKey]) {
      rowGroups[rowKey] = [];
    }
    rowGroups[rowKey].push({ el: article, col: info.col, row: info.row });
  });

  // Determine order: sort by row number
  const sortedRows = Object.keys(rowGroups).sort((a, b) => {
    const aNum = parseInt(a) || 999;
    const bNum = parseInt(b) || 999;
    return aNum - bNum;
  });

  // Rebuild the container with proper grouping
  // Remove all articles first
  articles.forEach((a) => a.remove());

  sortedRows.forEach((rowKey) => {
    const group = rowGroups[rowKey];
    const isFullWidth = group.length === 1 && (group[0].col.includes("/") || group[0].col === "");
    const isTwoColumn = group.length === 2 || (group.length === 1 && !group[0].col.includes("/") && group[0].col !== "");

    if (isTwoColumn && group.length === 2) {
      // Create a two-column row wrapper
      const rowDiv = document.createElement("div");
      rowDiv.className = "article-row";

      // Sort by column number
      group.sort((a, b) => {
        const aCol = parseInt(a.col) || 1;
        const bCol = parseInt(b.col) || 2;
        return aCol - bCol;
      });

      group.forEach((item) => {
        // Clear inline grid styles
        item.el.style.gridColumn = "";
        item.el.style.gridRow = "";
        rowDiv.appendChild(item.el);
      });

      // Add fade-in to the row wrapper instead
      rowDiv.classList.add("fade-in-section");
      group.forEach((item) => item.el.classList.remove("fade-in-section"));

      container.appendChild(rowDiv);
    } else {
      // Single full-width article
      group.forEach((item) => {
        item.el.style.gridColumn = "";
        item.el.style.gridRow = "";
        item.el.classList.add("article-full");
        container.appendChild(item.el);
      });
    }
  });

  // Re-observe any new fade-in sections created by the layout
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const newSections = container.querySelectorAll(".fade-in-section:not(.is-visible)");

  if (prefersReducedMotion) {
    newSections.forEach((s) => s.classList.add("is-visible"));
  } else if (newSections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    newSections.forEach((s) => observer.observe(s));
  }
})();

// Modal functionality
(function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.querySelector(".modal-close");
  const clickableBoxes = document.querySelectorAll(".article-box.clickable");

  if (!modalOverlay || !modalClose) return;

  function openModal(articleId, title) {
    const allContent = modalContent.querySelectorAll(".modal-article-content");
    allContent.forEach((content) => {
      content.style.display = "none";
    });

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

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      if (!modalOverlay.classList.contains("active")) {
        const allContent = modalContent.querySelectorAll(
          ".modal-article-content"
        );
        allContent.forEach((content) => {
          content.style.display = "none";
        });
      }
    }, 300);
  }

  clickableBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      e.preventDefault();
      const articleId = box.getAttribute("data-modal-id");
      const title = box.querySelector(".article-title").textContent;
      openModal(articleId, title);
    });
  });

  modalClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  const modalContainer = document.querySelector(".modal-container");
  if (modalContainer) {
    modalContainer.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
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

  const closeTimers = {
    left: null,
    right: null,
  };

  function openDrawer(side) {
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

  function closeDrawer(side, delay = 0) {
    if (closeTimers[side]) {
      clearTimeout(closeTimers[side]);
    }

    closeTimers[side] = setTimeout(() => {
      const overlay = drawerOverlays[side];
      if (overlay) {
        overlay.classList.remove("active");
        const anyDrawerOpen = document.querySelector(".drawer-overlay.active");
        const modalOpen = document.querySelector(".modal-overlay.active");
        if (!anyDrawerOpen && !modalOpen) {
          document.body.classList.remove("modal-open");
        }
      }
      closeTimers[side] = null;
    }, delay);
  }

  if (hoverZones.left) {
    hoverZones.left.addEventListener("mouseenter", () => openDrawer("left"));
    hoverZones.left.addEventListener("mouseleave", () => closeDrawer("left", 300));
  }

  if (hoverZones.right) {
    hoverZones.right.addEventListener("mouseenter", () => openDrawer("right"));
    hoverZones.right.addEventListener("mouseleave", () => closeDrawer("right", 300));
  }

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

    const touchY = e.touches[0].clientY;
    const deltaY = Math.abs(touchY - touchStartY);
    if (deltaY > Math.abs(deltaX)) {
      touchingSide = null;
      return;
    }

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

  if (drawerScrims.left) {
    drawerScrims.left.addEventListener("click", () => closeDrawer("left", 0));
  }

  if (drawerScrims.right) {
    drawerScrims.right.addEventListener("click", () => closeDrawer("right", 0));
  }

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

  if (hamburger) {
    hamburger.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (scrim) {
    scrim.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });
})();
