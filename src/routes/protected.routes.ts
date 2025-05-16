import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  const user = (req as any).user; // 혹은 타입 확장한 Request 사용
  res.json({
    message: "인증된 사용자 정보",
    user,
  });
});

export default router; // ✅ 이 줄이 없으면 import 안 됩니다!
