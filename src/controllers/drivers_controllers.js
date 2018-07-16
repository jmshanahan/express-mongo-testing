const Driver = require("models/driver");
module.exports = {
  greeting(req, res) {
    res.send({ hi: "There" });
  },
  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => {
        res.send(driver);
      })
      .catch(err => next(err));
    // .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps, {
      new: true,
      runValidators: true
    })
      .then(newDriver => res.send(newDriver))
      .catch(err => next(err));
  },
  delete(req, res, next) {
    const driverId = req.params.id;
    Driver.findByIdAndRemove({ _id: driverId })
      .then(newDriver => res.status(204).send(newDriver))
      .catch(err => next(err));
  }
};
