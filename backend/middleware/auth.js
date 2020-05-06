const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    const token = req.headers['access-token'];
    const decodeToken = jwt.verify(token,'strong_password');
    req.userData = {uId: decodeToken.uId};
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Your session is expired, Login Again'
    });
  };

}
