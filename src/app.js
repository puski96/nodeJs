const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gabi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    image: "/img/40645171_237116696925457_8526190486984065024_n.jpg",
    name: "Gabi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "What can I help you?",
    name: "Gabi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address term",
    });
  }

  geoCode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(long, lat, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        forecast,
        address: req.query.address,
      });
    });
  });

  //   console.log(req.query);
  //   res.send({
  //     forecast: "sunny",
  //     address: req.query.address,
  //   });
});

app.get("/help/*", (req, res) => {
  res.render("404", { title: "404", message: "help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404", message: "My 404 page" });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
