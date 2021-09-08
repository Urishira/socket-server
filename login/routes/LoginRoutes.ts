import { Application } from "express";
import { login } from "../controller/login";
import { check } from "express-validator";
import { fieldValidator } from "../../middlewares/fieldValidator";

export class LoginRoutes {
  public routes(app: Application): void {
    app
      .route("/login")
      .post(
        [
          check("email", "you must send an email").isEmail(),
          check("password", "you need to send a password").not().isEmpty(),
          fieldValidator,
        ],
        login
      );

    app.route("/renew").get( );
  }
}
