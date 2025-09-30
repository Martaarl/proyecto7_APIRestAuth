const { isAdmin } = require("../../middlewares/auth");
const express = require("express");
const { getPlatform, getPlatformById, putPlatform, postPlatform, deletePlatform } = require("../controllers/platforms");

const platformsRouter = express.Router();

platformsRouter.get("/:id", getPlatformById);
platformsRouter.get("/", getPlatform);
platformsRouter.post("/", [isAdmin],postPlatform);
platformsRouter.put("/:id", [isAdmin], putPlatform);
platformsRouter.delete("/:id",[isAdmin], deletePlatform);


module.exports = platformsRouter;