import { Request, Response, NextFunction } from "express";

type allowedRoles = "ADMIN" | "USER" | "BARBER";

export const ensureRole = (...roles: allowedRoles[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      return response.status(401).json({
        message: "User not authenticated!",
      });
    }

    const userRole = request.user.role;

    if (!roles.includes(userRole)) {
      return response.status(403).json({
        message: "Access denied, you do not have sufficient permission!",
      });
    }

    next();
  };
};
