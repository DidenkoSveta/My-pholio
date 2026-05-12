import "../scss/style.scss";

console.log("Проект запущен");

const page = document.body.dataset.page;

if (page === "home") {
  console.log("Главная страница");
}

if (page === "task-tracker") {
  console.log("Страница task-tracker");
}
