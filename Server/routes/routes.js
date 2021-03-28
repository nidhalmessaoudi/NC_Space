import express from "express";

const router = express.Router();

import * as RouteController from "../controllers/routeController.js";

router.route("/api/v1/test")
    .get(RouteController.getApiTest)
    .post(RouteController.postApiTest)
    .put(RouteController.putApiTest)
    .patch(RouteController.patchApiTest)
    .delete(RouteController.deleteApiTest);

export default router;
