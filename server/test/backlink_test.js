const assert = require("assert");
const request = require("supertest");
const Backlink = require("../models/backlink");
const app = require("../app");
const c = require("config");

describe("The backlink route", () => {
  const backlinkProps = {
    vendor: "Linkstop",
    orderStatus: "pending",
    dateOrdered: new Date().toISOString(),
    contentLanguage: "EN",
    anchor: "this is an anchor",
    targetUrl: "www.coolsite.com",
    backlinkUrl: "www.pbnlinks.com",
    price: 113.45,
    currency: "GBP",
  };

  it("adds a backlink", (done) => {
    request(app)
      .post("/api/backlink/new")
      .send(backlinkProps)
      .end((err, res) => {
        assert(res.body.vendor === "Linkstop");
        done();
      });
  });

  it("deletes backlinks", (done) => {
    const backlink1 = new Backlink({
      ...backlinkProps,
      targetUrl: "www.backlink1.com",
    });
    const backlink2 = new Backlink({
      ...backlinkProps,
      targetUrl: "www.backlink2.com",
    });
    const backlink3 = new Backlink({
      ...backlinkProps,
      targetUrl: "www.backlink3.com",
    });

    const idArray = {
      _idArray: [],
    };

    Promise.all([backlink1.save(), backlink2.save(), backlink3.save()])
      .then((res) => {
        res.forEach((record) => {
          idArray._idArray.push(record._id);
        });

        request(app)
          .post("/api/backlink/delete")
          .send(idArray)
          .end((err, res) => {
            if (err) console.error(err);
            assert(res.body.ok === 1);
            done();
          });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  it("edits the order status of backlinks", (done) => {
    const editTestBacklink = new Backlink({ ...backlinkProps });
    const requestBody = {
      _idArray: [],
      editProps: {
        orderStatus: "complete",
      },
    };
    editTestBacklink
      .save()
      .then((record) => {
        console.log(record);
        requestBody._idArray.push(record._id);
        console.log(requestBody);

        request(app)
          .post("/api/backlink/edit")
          .send(requestBody)
          .end((err, res) => {
            if (err) console.error(err);
            assert(res.body.ok === 1);
            done();
          });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });
});
