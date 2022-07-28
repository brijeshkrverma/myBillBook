const Package = require('../models/Packages');
const express = require('express');
const routerr = express.Router();

//Local Taxi
routerr.get('/local-taxi', (req, res, next) => {
    Package.find({category: "Local Taxi"}).then(data => {
    res.status(200).json(
      data
    );
  });
});

//One Way Taxi
routerr.get('/one-way-taxi', (req, res, next) => {
    Package.find({category: "One Way Taxi"}).then(data => {
    res.status(200).json(
      data
    );
  });
});

//Out Station Taxi
routerr.get('/out-station-taxi', (req, res, next) => {
    Package.find({category: "Outstation Taxi"}).then(data => {
    res.status(200).json(
      data
    );
  });
});

//Airport Transfer
routerr.get('/airport-transfer', (req, res, next) => {
    Package.find({category: "Airport Transfer"}).then(data => {
    res.status(200).json(
      data
    );
  });
});

//Railway Transfer
routerr.get('/railway-transfer', (req, res, next) => {
    Package.find({category: "Railway Transfer"}).then(data => {
    res.status(200).json(
      data
    );
  });
});

//Attach a Taxi
routerr.get('/Attach-a-taxi', (req, res, next) => {
    Package.find({category: "Attach a Taxi"}).then(data => {
    res.status(200).json(
      data
    );
  });
});


module.exports = routerr;