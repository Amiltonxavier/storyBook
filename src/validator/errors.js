const { validationResult } = require("express-validator");
/*
exports.result = validationResult(req).formatWith(errorFormatter);
if (!result.isEmpty()) {
  // Response will contain something like
  // { errors: [ "body[password]: must be at least 10 chars long" ] }
  return res.json({ errors: result.array() });
}

// Handle your request as if no errors happened


*/
export const ValidateMessenngerError = (req, res, next) => {

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
   /* const messages = []

    const errors = validationResult(req).array()
    for (const i of errors) {
      console.log(i)
     return res.status(400).json({error: messages.push(i.msg) })
    }*/
        return res.status(400).json({ error: errors.array()  })
    }
    next();
};