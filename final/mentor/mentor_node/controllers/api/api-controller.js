const jwt = require("jsonwebtoken");
const Course = require("../../models/course-model-mongoose");

exports.getToken = (req, res, next) => {
  try {
    // const {user, passwordsMatch} = res.local;

    // if (!user || !passwordsMatch) {
    //   const error = new Error("Not Authenticated.");
    //   error.statusCode = 401;
    //   return next(error);
    // }

    const token = jwt.sign(
      // {email: user.email, userId: user._id.toString()},
      { data: "api-access" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Token Generated.",
      data: { token },
    });
  } catch (error) {
    console.error("Token generation error: ", error);
    res.status(500).json({ error: "Unable to generate token" });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const queryToken = req.query.token;

    if (!queryToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(queryToken, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("Token not valid.");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token has expired.";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token.";
    }

    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = error.message || "Server Error";
    }
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const cours = await NonExistentModel.find();

    const courses = await Course.find()
      .populate("trainer", "name")
      .select("-registrants")
      .lean();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const sanitized = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      titleSlug: course.titleSlug,
      summary: course.summary,
      description: course.description,
      price: course.price,
      capacity: course.capacity,
      likes: course.likes,
      schedule: course.schedule,
      trainer: {
        _id: course.trainer._id,
        name: course.trainer.name,
      },
      imageUrl: `${baseUrl}/assets/img/${course.image}`,
    }));

    res.locals.data = sanitized;
    return next();
  } catch (error) {
    console.error("Error is: ", error);
    next(new Error("Failed to retrieve Courses"));
  }
};

exports.sendResponse = (req, res) => {
  res.status(200).json({
    message: "Success!",
    data: res.locals.data,
  });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: `Error! ${err.message}`,
    data: null,
  });
};
