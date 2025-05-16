import jwt from "jsonwebtoken"; 

import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "아이디와 비밀번호는 필수입니다." });
  }

  const userRepo = AppDataSource.getRepository(User);
  const existing = await userRepo.findOneBy({ username });

  if (existing) {
    return res.status(409).json({ message: "이미 존재하는 사용자입니다." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = userRepo.create({ username, password: hashedPassword });
  await userRepo.save(newUser);

  return res.status(201).json({ message: "회원가입 성공" });
});

router.post("/login", async (req: any, res: any) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "아이디와 비밀번호는 필수입니다." });
    }
  
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ username });
  
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 사용자입니다." });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "default_secret", // .env 설정도 확인!
      { expiresIn: "1h" }
    );
  
    return res.status(200).json({ message: "로그인 성공", token });
  });

export default router;
