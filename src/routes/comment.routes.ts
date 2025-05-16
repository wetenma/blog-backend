import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/:postId/comments", authMiddleware, async (req: any, res: any) => {
    const { content } = req.body;
    const user = req.user;
    const postId = parseInt(req.params.postId, 10);
  
    if (!content) {
      return res.status(400).json({ message: "댓글 내용은 필수입니다." });
    }
  
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOneBy({ id: postId });
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
  
    const userRepo = AppDataSource.getRepository(User);
    const author = await userRepo.findOneBy({ id: user.userId });
    if (!author) {
      return res.status(404).json({ message: "작성자를 찾을 수 없습니다." });
    }
  
    const commentRepo = AppDataSource.getRepository(Comment);
    const newComment = commentRepo.create({ content, author, post });
    await commentRepo.save(newComment);
  
    res.status(201).json({ message: "댓글 작성 완료", comment: newComment });
  });

export default router;
