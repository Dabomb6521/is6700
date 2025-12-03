exports.get404 = (req, res) => {
  res.status(404).render("error/404", { title: "Page Not Found" });
};

exports.get500 = (error, req, res, next) => {
  res.status(500).render("error/500", { title: "Server Error", error });
};
