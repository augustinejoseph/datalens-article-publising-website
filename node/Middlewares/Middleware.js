const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { JWT_SECRET_KEY } = require('../config/config');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function userTokenMiddlewareForJWT(req, res, next) {
  
  // const key = process.env.SECRET_KEY
  
  const authHeader = req.headers["authorization"];
  
  const token = authHeader && authHeader.split(" ")[1];
  // 

  if (token == null) {
    // 
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      
      return res.sendStatus(403);
    }
    // 
    req.user = user;
    next();
  });
}

function adminTokenMiddlewareForJWT(req, res, next) {
  

  const authHeader = req.headers["authorization"];
  

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (!user || !user.is_admin) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

module.exports = {
  userTokenMiddlewareForJWT,
  adminTokenMiddlewareForJWT,
};
