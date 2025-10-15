const Course = require('../models/course-model');
const Trainer = require('../models/trainer-model');

exports.getAllCourses = (req, res) => {
    Course.findAll({
        include: [{
            model: Trainer,
            as: 'trainerInfo'
        }]
    })
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

    Course.findOne({
        where: {
            titleSlug: titleSlug
        },
        include: [{
            model: Trainer,
            as: 'trainerInfo'
        }]
    })
    .then((course) => {
        if (!course) {
            return next();
        } else {
            console.log("Retrieved course is: ", course)
            res.render("course-details", { title: "Course Details", course });
        }
    })
    .catch((err) => console.log(err));
}