const Course = require('../models/course-model');
const Trainer = require('../models/trainer-model');

exports.getAllCourses = (req, res) => {
    Course.find()
    .populate('trainer')
    .then(courses => {
        res.render('courses', {
            title: 'Courses',
            courses: courses
        })
    })
    .catch((err) => console.error(err));
};

exports.getCourseDesc = (req, res, next) => {
    const titleSlug = req.params.titleSlug;

    Course.findOne({titleSlug: titleSlug})
    .populate('trainer')
    .then((course) => {
        if (!course) {
            return next();
        } else {
            // console.log("Retrieved course is: ", course)
            res.render("course-details", { title: "Course Details", course });
        }
    })
    .catch((err) => console.log(err));
}