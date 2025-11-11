// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

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

// Start typing after brief delay
setTimeout(() => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");

  typeText(line1, "AI that does what you want", 40, () => {
    const period1 = document.createElement("span");
    period1.className = "period";
    period1.textContent = ".";
    line1.appendChild(period1);

    setTimeout(() => {
      typeText(line2, "The way you want it done", 40, () => {
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
