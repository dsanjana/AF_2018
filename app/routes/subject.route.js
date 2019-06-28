const express = require('express')
const subjectRoute = express.Router()

//require subject model
const Subject = require('./subject.model')

//api for add new subject
subjectRoute.route('/addSubject').post( function(req, res) {
    let subject = new Subject(req.body)
    subject.save(function(err, subject){
        if(err){
            console.log(err)
        }
        else{
            console.log(subject)
            res.status(200).json({'message': 'Subject details added successfully!'})
        }
    })
        // .then( subject => {
        //     res.status(200).json({'message': 'Subject details added successfully!'})
        // })
        // .catch(err => {
        //     res.status(500).send("Unable to save details to database")
        // })
});

//api for get all subjects
subjectRoute.route('/getSubjects').get( function(req, res) {
    Subject.find(function(err, subjects) {
        if(err){
            console.log(err)
        }
        else{
            console.log(subjects)
            res.json(subjects)
        }
    })
});

//api for get selected subject
subjectRoute.route('/getSubject/:Id').get( function(req, res) {
    let Id = req.params.Id;
    Subject.findOne({_id: Id}, function(err, subject) {
        if(err){
            console.log(err)
        }
        else{
            console.log(subject)
            res.json(subject)
        }
    })
});

module.exports = subjectRoute;