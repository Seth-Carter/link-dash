const mongoose = require("mongoose");
const faker = require("faker");
const Backlink = require("../models/backlink");

const numberOfSeeds = 500;

mongoose.connect("mongodb://localhost/linkdash", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Database connected!");

    const backlinks = [];
    for (let i = 0; i < numberOfSeeds; i++) {
      let newBacklink = {
        targetUrl: faker.internet.url(),
        backlinkUrl: faker.internet.url(),
        anchor: faker.lorem.words(3),
        dateOrdered: faker.date.past(1),
        vendor: faker.company.companyName(),
        orderStatus: faker.random.arrayElement([
          "started",
          "pending",
          "reviewing",
          "complete",
        ]),
        contentLanguage: faker.random.arrayElement([
          "EN",
          "IT",
          "ES",
          "PT",
          "DE",
          "FR",
        ]),
        price: parseInt(faker.finance.amount(30, 235, 2)),
        currency: faker.random.arrayElement(["USD", "GBP", "EUR"]),
      };
      backlinks.push(newBacklink);
    }

    Backlink.insertMany(backlinks)
      .then((res) => {
        console.log("Seed was successful!");
        console.log(res);
        mongoose.disconnect();
      })
      .catch((err) => {
        console.log("Seed failed! :(");
        console.error(err);
        mongoose.disconnect();
      });
  })
  .on("error", (error) => {
    console.warn("Warning!", error);
  });
