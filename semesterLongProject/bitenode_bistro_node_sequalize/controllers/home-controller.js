exports.getHome = (req, res) => {
    res.render('index.ejs', {title: "Home"});
};

exports.getAbout = (req, res) => {
    res.render('about.ejs', {title: "About Us"})
}