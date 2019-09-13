module.exports = (req, res, next) => {
  req.user = {
    sub: 'fake-user|12345'
  };

  next();
};
