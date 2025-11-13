// Handle all unrecognized requests
exports.get404 = (req, res) => {
  // Render a 404 page
  res.status(404).render("error/404", { title: "Page not found" });
};

exports.get500 = (error, req, res, next) => {
  res.status(500).render("error/500", {
    title: "Error!",
    error,
  });
};
