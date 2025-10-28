import express from "express";
import {
  getUsers,
  login,
  logout,
  signup,
  updateUser,
} from "../controller/user.controller.js";
import { authenticate } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-user", authenticate, updateUser);
router.get("/get-users", authenticate, getUsers);

export default router;
