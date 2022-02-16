const btn = document.querySelector(".como-funciona button");
const [form] = document.forms;

btn.addEventListener("click", () => {
  btn.classList.toggle("ativo");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = e.target[0].value;
  const body = { originURL: url };

  const resp = await fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
  console.log(resp);
  showShortenedLink(resp);
});

function showShortenedLink(link) {
  const linkShortend = document.querySelector(".shortened-link");

  linkShortend.innerText = link;
}
