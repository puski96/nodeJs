const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const paragraph1 = document.querySelector("#message-1");
const paragraph2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  paragraph1.textContent = "Loading...";
  paragraph2.textContent = "";
  fetch("http://localhost:4000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          paragraph1.textContent = data.error;
        }
        paragraph1.textContent = data.location;
        paragraph2.textContent = data.forecast;
      });
    }
  );
});
