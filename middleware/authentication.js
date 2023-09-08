const { signedCookie, signedCookies } = require('cookie-parser');
const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  //check if there is token or not
  if (!token) {
    throw new CustomError.UnauthenticatedError('Athentication Invalid');
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Athentication Invalid');
  }
};

const authorizePermissons = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route '
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermissons };
