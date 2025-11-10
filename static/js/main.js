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
