const jwt = require('jsonwebtoken')
require('dotenv').config()
// const { JWT_SECRET_KEY } = require('../config/config');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function userTokenMiddlewareForJWT(req, res, next) {
  console.log('jwt secret keyt', JWT_SECRET_KEY);
  // const key = process.env.SECRET_KEY
  console.log(JWT_SECRET_KEY);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    // console.log('authheader', authHeader , '---- and --- token', token);

    if (token == null){
      // console.log('empty token in node middleware');
      return res.sendStatus(401);
    }

jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    // console.log('user in middleware jwt in nodejs', user);
    req.user = user;
    next();
  });
}



function adminTokenMiddlewareForJWT(req, res, next) {
  console.log('jwt secret keyt', JWT_SECRET_KEY);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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
  adminTokenMiddlewareForJWT
};