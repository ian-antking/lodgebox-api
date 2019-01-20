const isTeacher = (req, res, next) => {
  if (!req.authorizer.teacher) {
    res.status(401).json({ error: 'You are not authorised to perform this action' });
  } else {
    next();
  }
};

module.exports = isTeacher;
