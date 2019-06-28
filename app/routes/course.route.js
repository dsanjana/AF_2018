const express = require('express');
const courseRoute = express.Router();

//require course model
const Course = require('./course.model');

//api for add new course
courseRoute.route('/addCourse').post(function (req, res) {
    let course = new Course(req.body)
    course.save()
        .then(course => {
            res.status(200).json({ 'message': 'Course details added successfully!' })
        })
        .catch(err => {
            res.status(500).send("Unable to save details to database")
        })
});

//api for get all courses
courseRoute.route('/getCourses').get(function (req, res) {
    Course.find(function (err, courses) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(courses)
            res.json(courses)
        }
    })
});

//api for get selected course
courseRoute.route('/getCourses/:name').get(function (req, res) {
    let Id = req.params.name;
    Course.findOne({ name: Id }, function (err, courses) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(courses)
            res.json(courses)
        }
    })
});

module.exports = courseRoute;