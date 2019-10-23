// const employeeProvider = require('../config/config')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // employeeProvider.prototype.findAll(function (error, employees) {
    //     console.log('employee >>>', employees)
    //     res.render('index', {
    //         title: 'Employees Managemen System',
    //         employees: employees
    //     });
    // });

    //console.log('Leck!!!!', employeeProvider)
    res.json([{
        id: 1,
        name: "Hiccup",
        password: 'hiccup'
    }, {
        id: 2,
        name: "King Arthur",
        password: 'king-arthur'
    }]);
});

module.exports = router;
