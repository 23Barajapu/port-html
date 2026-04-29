// ===== GSAP =====
gsap.registerPlugin(ScrollTrigger);

// ===== Project Data =====
const projectData = [
  {
    title: "Android-based Tobacco Land Management Information System",
    description: ["Decision Support System (DSS)", "Management Information System (MIS)", "Mobile Application", "Agricultural Information System", "AgriTech", "Geographic Information System (GIS)"],
    tools: "Javascript, PHP, Laravel",
    image: "images/kelola.webp",
    link: "https://mobile.tembakaucaringin.com/"
  },
  {
    title: "Information System for Tobacco Marketing",
    description: ["Marketing Information System", "Customer Relationship Management", "Supply Chain Management", "E-Commerce", "Business Intelligence", "Web Application"],
    tools: "Javascript, PHP, Laravel",
    image: "images/tembakau.webp",
    link: "https://tembakaucaringin.com/"
  },
  {
    title: "Biro Jasa Mahkota",
    description: ["Sistem Biro Jasa Pengurusan STNK, BPKB, Balik nama, dan Mutasi"],
    tools: "PHP, Laravel, MySQL, JavaScript",
    image: "images/bjmahkota.webp",
    link: "bjmahkota.com"
  }
];

// ===== Generate Work Cards =====
function generateWorkCards() {
  const grid = document.getElementById("workGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const items = projectData.length >= 3 ? projectData : [
    ...projectData,
    ...Array(4 - projectData.length).fill(projectData[0])
  ];

  items.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = "work-card";

    const tagsHTML = project.description
      .map(d => `<li>${d}</li>`).join("");

    card.innerHTML = `
      <div class="work-card-img">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
      </div>
      <div class="work-card-body">
        <div class="work-card-num">0${i + 1}</div>
        <div class="work-card-title">${project.title}</div>
        <ul class="work-card-tags">${tagsHTML}</ul>
        <p class="work-card-tools">${project.tools}</p>
        ${project.link
          ? `<a class="work-card-link" href="${project.link}" target="_blank" rel="noopener noreferrer">
               Lihat Project
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
             </a>`
          : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== Custom Cursor =====
function initCursor() {
  const cursor = document.getElementById("cursorMain");
  if (!cursor || window.matchMedia("(hover: none)").matches) return;

  let hover = false;
  const mousePos = { x: 0, y: 0 };
  const cursorPos = { x: 0, y: 0 };

  document.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  (function loop() {
    if (!hover) {
      cursorPos.x += (mousePos.x - cursorPos.x) / 6;
      cursorPos.y += (mousePos.y - cursorPos.y) / 6;
      gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
    }
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseover", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (el.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.set(cursor, { x: rect.left, y: rect.top });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (el.dataset.cursor === "disable") cursor.classList.add("cursor-disable");
    });
    el.addEventListener("mouseout", () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    });
  });
}

// ===== Smooth scroll nav links =====
function initNavScroll() {
  document.querySelectorAll(".header ul a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ===== Nav fade on scroll =====
function initNavFade() {
  const navFade = document.getElementById("navFade");
  if (!navFade) return;
  const check = () => navFade.classList.toggle("visible", window.scrollY > 60);
  window.addEventListener("scroll", check, { passive: true });
  check();
}

// ===== What I Do click (touch) =====
function initWhatIDo() {
  document.querySelectorAll(".what-content").forEach((card) => {
    card.addEventListener("click", () => {
      const isActive = card.classList.contains("what-content-active");
      // collapse all siblings first
      if (card.parentElement) {
        card.parentElement.querySelectorAll(".what-content").forEach((sibling) => {
          sibling.classList.remove("what-content-active", "what-sibling");
        });
      }
      if (!isActive) card.classList.add("what-content-active");
    });
  });
}

// ===== GSAP scroll reveal =====
function initRevealAnimations() {
  const reveal = (selector, vars = {}) => {
    gsap.from(selector, {
      scrollTrigger: { trigger: selector, start: "top 85%", once: true },
      y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
      ...vars
    });
  };

  reveal(".about-card");
  reveal(".what-box h2.title", { x: -60, y: 0 });
  reveal(".what-content", { stagger: 0.15 });
  reveal(".career-section > h2");
  reveal(".career-info-box", { stagger: 0.15 });
  reveal(".work-section-inner > h2");
  reveal(".work-card", { stagger: 0.1 });
  reveal(".techstack-title");
  reveal(".tech-sphere", { stagger: 0.07 });
  reveal(".contact-section h3");
  reveal(".contact-box", { stagger: 0.12 });
}

// ===== Career timeline fill on scroll =====
function initCareerTimeline() {
  const tl = document.querySelector(".career-timeline");
  if (!tl) return;
  gsap.to(tl, {
    scaleY: 1,
    transformOrigin: "top center",
    ease: "none",
    scrollTrigger: {
      trigger: ".career-section",
      start: "top 70%",
      end: "bottom 30%",
      scrub: true
    }
  });
  tl.style.transform = "scaleY(0)";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  generateWorkCards();
  initCursor();
  initNavScroll();
  initNavFade();
  initWhatIDo();
  initRevealAnimations();
  initCareerTimeline();
});
