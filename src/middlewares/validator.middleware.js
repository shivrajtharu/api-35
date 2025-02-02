const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      let data = req.body;
      const response = await schema.validateAsync(data, {abortEarly: false});
      next();
    } catch (exception) {
        // console.log(exception);
        let errBag = {};
        if (exception.details) {
            exception.details.map((error) => {
                // console.log(error);
                errBag[error.context.label] = error.message;
            })
        }
        next({
            code: 400,
            detail: errBag,
            message: "Validation Error",
            status: "BAD_REQUEST",
        });
    }
  };
};

module.exports = {
  bodyValidator,
};
