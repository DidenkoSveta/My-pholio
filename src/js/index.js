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
