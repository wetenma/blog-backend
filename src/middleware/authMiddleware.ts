import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "인증 토큰이 없습니다." });
    return; // 명시적 종료 (void)
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    (req as AuthRequest).user = decoded;
    next(); // 정상 진행
  } catch (err) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
};