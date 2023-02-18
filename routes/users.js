var router = require("express").Router();
const { body, validationResult } = require("express-validator");
const UserManager = require("../models/users");

router.post("/signin", require("../controllers/userControllers/signIn"));
router.post(
  "/register",
  body("username", "Introduce un email válido")
    .exists()
    .isEmail()
    .custom( async (value, {req}) => {
      const exist = await UserManager.signIn(value);
      if (exist) {
        throw new Error("El nombre de usuario ya existe");
      }
      return true;
    }),
  body("name", "Introduce un nombre válido").exists().isLength({ min: 3 }),
  body("password", "Introduce una contraseña válida")
    .exists()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array();
      res.status(400).json({ errorsMsg: errorsMsg });
    } else {
      next();
    }
  },
  require("../controllers/userControllers/resgister")
);

module.exports = router;
