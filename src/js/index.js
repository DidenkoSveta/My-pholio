import "../scss/style.scss";

console.log("Проект запущен");

const page = document.body.dataset.page;

if (page === "home") {
  console.log("Главная страница");
}

if (page === "task-tracker") {
  console.log("Страница task-tracker");
}

if (page === "design-system") {
  console.log("Страница design-system");
}

if (page === "hr-ai") {
  console.log("Страница hr-ai");
}

if (page === "kcr-lo") {
  console.log("Страница kcr-lo");
}

const caseNavLinks = document.querySelectorAll(".case-nav__link");

if (caseNavLinks.length) {
  let isClickScrolling = false;
  let clickScrollTimer = null;

  const sections = Array.from(caseNavLinks)
    .map((link) => {
      const sectionId = link.getAttribute("href");
      return document.querySelector(sectionId);
    })
    .filter(Boolean);

  const setActiveLink = (sectionId) => {
    caseNavLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
    });
  };

  caseNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const sectionId = link.getAttribute("href");
      const section = document.querySelector(sectionId);

      if (!section) return;

      isClickScrolling = true;

      caseNavLinks.forEach((item) => {
        item.classList.remove("is-active");
      });

      link.classList.add("is-active");

      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      clearTimeout(clickScrollTimer);

      clickScrollTimer = setTimeout(() => {
        isClickScrolling = false;
      }, 900);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (isClickScrolling) return;

      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries.length) {
        setActiveLink(visibleEntries[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75],
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
