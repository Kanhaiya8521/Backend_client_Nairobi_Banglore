import { user_controller } from "./../controllers/user.controller";

export default (router: any) => {
    router.route("/user").post(user_controller.createUser).get(user_controller.getUser);

}