import { Request, Response } from "express";
import User from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

/* REGISTER */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const userExists =
      await User.findOne({
        email,
      });

    if (userExists) {

      res.status(400).json({
        message:
          "User already exists",
      });

      return;

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({

        name,
        email,
        password:
          hashedPassword,

      });

    res.status(201).json({

      message:
        "User registered successfully",

      userId:
        user._id,

    });

  } catch (error: any) {

    res.status(500).json({
      message:
        error.message ||
        "Server error",
    });

  }

};


/* LOGIN */
export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      res.status(400).json({
        message:
          "Invalid credentials",
      });

      return;

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      res.status(400).json({
        message:
          "Invalid credentials",
      });

      return;

    }

    const token =
      jwt.sign(
        {
          id:
            user._id.toString(),
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn:
            "1d",
        }
      );

    res.cookie(
      "token",
      token,
      {

        httpOnly: true,

        secure: false,

        sameSite:
          "lax",

      }
    );

    res.status(200).json({

      message:
        "Login successful",

    });

  } catch (error: any) {

    res.status(500).json({

      message:
        error.message ||
        "Server error",

    });

  }

};