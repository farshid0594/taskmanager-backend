exports.ValidateMobile = (req, res, next) => {
  const { mobile } = req.body;
  if (!(/^09[0-9]{9}$/.test(mobile))) {
    return res
      .status(400)
      .json({ errors: "phone number format is not correct" });
  }else{
    next();
  }
};
