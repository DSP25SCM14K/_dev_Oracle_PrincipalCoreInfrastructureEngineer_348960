const words = ["Capacity planning", "Workflow automation", "Data systems", "Reliability engineering"];
const rotating = document.querySelector("#rotating-text");
let wordIndex = 0;
if (rotating) {
  window.setInterval(() => {
    rotating.classList.add("is-changing");
    window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotating.textContent = words[wordIndex];
      rotating.classList.remove("is-changing");
    }, 180);
  }, 2600);
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const captions = {
  nominal: ["BASELINE READY", "Use current utilization and workload signals to establish a baseline before projecting future demand."],
  degraded: ["SUPPLY CONSTRAINT", "Compare projected demand with lead times, available inventory, and service objectives to expose a gap while there is still time to act."],
  recovery: ["CAPACITY READY", "Confirm resources are provisioned, telemetry is healthy, and the workload can meet its availability and latency targets."]
};
document.querySelectorAll(".loop-button").forEach(button => button.addEventListener("click", () => {
  const mode = button.dataset.mode;
  document.querySelectorAll(".loop-button").forEach(other => {
    const active = other === button;
    other.classList.toggle("active", active);
    other.setAttribute("aria-pressed", String(active));
  });
  const panel = document.querySelector(".loop-panel");
  panel.classList.remove("mode-degraded", "mode-recovery");
  if (mode !== "nominal") panel.classList.add(`mode-${mode}`);
  document.querySelector("#loop-status").textContent = captions[mode][0];
  document.querySelector("#loop-caption").textContent = captions[mode][1];
}));

document.querySelectorAll(".filter-button").forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  document.querySelectorAll(".filter-button").forEach(other => {
    const active = other === button;
    other.classList.toggle("active", active);
    other.setAttribute("aria-pressed", String(active));
  });
  let visible = 0;
  document.querySelectorAll(".project-card").forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  document.querySelector("#visible-project-count").textContent = visible;
}));

const navLinks = [...document.querySelectorAll('.topbar nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('current', link.hash === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(section => sectionObserver.observe(section));
