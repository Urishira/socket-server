import { Application, Request, Response } from "express";
import {
  userDelete,
  userGet,
  userPost,
  userPut,
} from "../controllers/userController";
import { check } from "express-validator";
import { emailValidator, idValidator } from "../middleware/databaseValidator";
import { fieldValidator } from "../../middlewares/fieldValidator";
import { jwtValidator } from "../../helpers/token/jwtValidator";

export class UserRoutes {
  public routes(app: Application): void {
    app
      .route("/users")
      .get(userGet)
      .post(
        [
          check("name", "Name is required").not().isEmpty(),
          check("email", "this is not an email valid").isEmail(),
          check("email").custom(emailValidator),
          check(
            "password",
            "password must be equal to 8 or greater 8 characters"
          ).isLength({ min: 8 }),
          fieldValidator,
        ],
        userPost
      );
    app
      .route("/users/:id")
      .put(
        [
          check("id", "id is required").not().isEmpty(),
          check("id").custom(idValidator),
          check("id", "id i not mongo id").isMongoId(),
          fieldValidator,
        ],
        userPut
      )
      .delete(
        jwtValidator,

        [
          check("id", "id is required").not().isEmpty(),
          check("id", "id i not mongo id").isMongoId(),
          check("id").custom(idValidator),
          fieldValidator,
        ],
        userDelete
      );
  }
}
