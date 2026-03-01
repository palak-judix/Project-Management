import express, { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "./auth.controller";

const router = express.Router();

/* Register */
router.post(
  "/register",
  registerUser
);

/* Login */
router.post(
  "/login",
  loginUser
);

/* Logout */
router.post(
  "/logout",
  (
    req: Request,
    res: Response
  ) => {

    res.clearCookie(
      "token"
    );

    res.json({
      message:
        "Logged out",
    });

  }
);

export default router;