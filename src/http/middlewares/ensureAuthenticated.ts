import { Request, Response, NextFunction } from "express";

import { JwtPayload, verify } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

interface DecodedToken extends JwtPayload {
  sub: string;
  role: "ADMIN" | "USER" | "BARBER";
}

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({ message: "Token is missing!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded.sub || !decoded.role) {
      return response.status(401).json({
        message: "Payload incomplete!",
      });
    }

    request.user = {
      id: decoded.sub as string,
      role: decoded.role,
    };

    return next();
  } catch (err: any) {
    return response.status(401).json({
      message: "Token invalid or expired!",
    });
  }
};
