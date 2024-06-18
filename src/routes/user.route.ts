import { user_controller } from "./../controllers/user.controller";

export default (router: any) => {
  router
    .route("/user")
    .post(user_controller.createUser)
    .get(user_controller.getUser);
  router.route("/signup").post(user_controller.signup);
  router.route("/signin").post(user_controller.signin);
};
