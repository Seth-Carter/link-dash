const Backlink = require("../models/backlink");

module.exports = {
  createBacklink(req, res) {
    const backlink = new Backlink({
      vendor: req.body.vendor,
      orderStatus: req.body.orderStatus,
      dateOrdered: req.body.dateOrdered,
      contentLanguage: req.body.contentLanguage,
      anchor: req.body.anchor,
      targetUrl: req.body.targetUrl,
      backlinkUrl: req.body.backlinkUrl,
      price: req.body.price,
      currency: req.body.currency,
    });
    backlink
      .save()
      .then((newBacklink) => res.send(newBacklink))
      .catch((err) => res.status(422).send(err));
  },

  editBacklinks(req, res) {
    Backlink.updateMany(
      {
        _id: {
          $in: req.body._idArray,
        },
      },
      {
        $set: req.body.editProps,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => res.status(422).send({ error: err.message }));
  },

  fetchBacklinks(req, res) {
    const { page = 0, limit = 10 } = req.query;
    const { filters } = req.body || {
      dateOrdered: { startDate: null, endDate: null },
    };
    const payload = {};

    const filterProcessor = (filterInput) => {
      const { startDate, endDate } = filterInput.dateOrdered;

      if (startDate && endDate !== null) {
        return {
          dateOrdered: {
            $gte: new Date(startDate.substr(0, 10)),
            $lte: new Date(endDate.substr(0, 10)),
          },
        };
      } else if (startDate !== null && endDate === null) {
        return {
          dateOrdered: {
            $gte: new Date(startDate.substr(0, 10)),
          },
        };
      } else if (startDate === null && endDate !== null) {
        return {
          dateOrdered: {
            $lte: new Date(endDate.substr(0, 10)),
          },
        };
      } else return {};
    };

    Backlink.find(filterProcessor(filters))
      .sort({ dateOrdered: -1 })
      .limit(limit * 1)
      .skip(page * limit)
      .then((backlinks) => {
        payload.backlinks = backlinks;
        return Backlink.countDocuments(filterProcessor(filters));
      })
      .then((count) => {
        (payload.totalDocuments = count),
          (payload.currentPage = parseInt(page, 10));
        res.send(payload);
      })
      .catch((err) => res.status(422).send({ error: err.message }));
  },

  deleteBacklinks(req, res) {
    Backlink.deleteMany({
      _id: {
        $in: req.body._idArray,
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(422).send({ error: err.message }));
  },
};
