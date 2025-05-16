import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Like } from "../entity/Like";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:postId/like", authMiddleware, async (req: any, res: any) => {
  const userId = req.user.userId;
  const postId = parseInt(req.params.postId, 10);

  const postRepo = AppDataSource.getRepository(Post);
  const likeRepo = AppDataSource.getRepository(Like);
  const userRepo = AppDataSource.getRepository(User);

  const post = await postRepo.findOneBy({ id: postId });
  if (!post) {
    return res.status(404).json({ message: "게시글이 존재하지 않습니다." });
  }

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
   return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  const existingLike = await likeRepo.findOneBy({ post: { id: postId }, user: { id: userId } });

  if (existingLike) {
   await likeRepo.remove(existingLike);
   return res.json({ message: "좋아요 취소됨" });
 } else {
   const newLike = likeRepo.create({ post, user });
   await likeRepo.save(newLike);
   return res.status(201).json({ message: "좋아요 완료" });
 }
});

export default router;
