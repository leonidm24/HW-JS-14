const req = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const [...navItems] = document.querySelectorAll("#nav > li"),
  links = {
    nbu: "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    swapi: "https://swapi.dev/api/people/",
    list: "https://jsonplaceholder.typicode.com/todos",
  },
  loader = document.querySelector(".loader");

navItems.forEach((li) => {
  li.addEventListener("click", function () {
    loader.classList.add("active");

    switch (this.dataset.validate) {
      case "nbu":
        req(links.nbu)
          .then((d) => showNbu(d))
          .catch((info) => console.error(info));
        return;
      case "swapi":
        req(links.swapi)
          .then((d) => showSwapi(d.results))
          .catch((info) => console.error(info));
        return;
      case "list":
        req(links.list)
          .then((d) => showTodo(d))
          .catch((info) => console.error(info));
        return;
    }
  });
});

function showTodo(data) {
  loader.classList.remove("active");
  const taskList = `
    <table class="task-list">
    <thead><tr><th>№</th><th>Що зробити</th><th>Статус</th><th>Редагувати</th><th>Зберегти</th></tr></thead>
     <tbody>
    ${
      Array.isArray(data)
        ? data
            .map((el) => {
              return `<tr><td>${el.id}</td><td>${el.title}</td><td>${
                el.completed ? "&#9989;" : "&#10060;"
              }</td><td>+++</td><td>---</td></tr>`;
            })
            .join("")
        : ""
    }
            </tbody>
    </table>
    `;
  document.querySelector(".info").innerHTML = '';
  document.querySelector(".info").insertAdjacentHTML("beforeend", taskList);
}

function showSwapi(data) {
  loader.classList.remove("active");
  const swapiList = `
        <table class="swapi-list">
    <thead><tr><th>Name</th><th>Gender</th><th>Home World</th><th>Year of birth</th></tr></thead>
     <tbody>
    ${
      Array.isArray(data)
        ? data
            .map((el) => {
              return `<tr><td>${el.name}</td><td>${el.gender}</td><td>${el.homeworld}</td><td>${el.birth_year}</td></tr>`;
            })
            .join("")
        : ""
    }
            </tbody>
    </table>
    `;
    document.querySelector(".info").innerHTML = '';
  document.querySelector(".info").insertAdjacentHTML("beforeend", swapiList);
}

function showNbu(data) {
  loader.classList.remove("active");
  const nbuList = `
        <table class="nbu-list">
    <thead><tr><th>Name</th><th>Rate</th><th>Exchange date</th></tr></thead>
     <tbody>
    ${
      Array.isArray(data)
        ? data
            .map((el) => {
              return `<tr><td>${el.txt} / ${el.cc}</td><td>${el.rate}</td><td>${el.exchangedate}</td></tr>`;
            })
            .join("")
        : ""
    }
            </tbody>
    </table>
    `;
    document.querySelector(".info").innerHTML = '';
  document.querySelector(".info").insertAdjacentHTML("beforeend", nbuList);
}
