const jwt = require("jsonwebtoken");

//acces check throw error if the user is not Authorized
//if user is authorized then req.userId is exist
exports.accesCheck = (req, res, next) => {
  let check = req.get("Authorization");

  if (!check) {
    let error = new Error("Acces Denied");
    error.statusCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, "thisissecretkey");
  } catch (err) {
    err.statusCode = 500;

    throw err;
  }
  if (!decoded) {
    let error = new Error("Acces Denied");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decoded.userId;
  next();
};

//userCheck does not give an error even if user is not Authorized, but the system will not recognised req.userId

exports.userCheck = (req, res, next) => {
  let check = req.get("Authorization");

  if (!check) {
    next();
  } else {
    const token = req.get("Authorization").split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, "thisissecretkey");
    } catch (err) {
      err.statusCode = 500;

      throw err;
    }
    if (!decoded) {
      let error = new Error("Acces Denied");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decoded.userId;
    next();
  }
};
