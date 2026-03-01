import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email?: string;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided" });
  }

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

    (req as any).user = decoded;

    next();

  } catch (error) {

    return res
      .status(401)
      .json({ message: "Invalid token" });

  }
}