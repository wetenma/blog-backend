import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

//게시글 작성
router.post("/", authMiddleware, async (req: any, res: any) => {
  const { title, content } = req.body;
  const user = (req as any).user;

  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용은 필수입니다." });
  }

  const userRepo = AppDataSource.getRepository(User);
  const author = await userRepo.findOneBy({ id: user.userId });

  if (!author) {
    return res.status(404).json({ message: "작성자를 찾을 수 없습니다." });
  }

  const postRepo = AppDataSource.getRepository(Post);
  const newPost = postRepo.create({
    title,
    content,
    author,
  });

  await postRepo.save(newPost);
  res.status(201).json({ message: "게시글 작성 완료", post: newPost });
});

//게시글 전체 목록 조회
router.get("/", async (req, res) => {
    const postRepo = AppDataSource.getRepository(Post);
  
    const posts = await postRepo.find({
      relations: ["author"],
      order: { createdAt: "DESC" },
    });
  
    const formatted = posts.map((post) => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      author: post.author.username,
    }));
  
    res.json({ posts: formatted });
});
  
// 게시글 수정
router.patch("/:id", authMiddleware, async (req: any, res: any) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const user = req.user;
  
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({
      where: { id: postId },
      relations: ["author"],
    });
  
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
  
    if (post.author.id !== user.userId) {
      return res.status(403).json({ message: "본인 게시글만 수정할 수 있습니다." });
    }
  
    if (title) post.title = title;
    if (content) post.content = content;
  
    await postRepo.save(post);
  
    res.json({ message: "게시글 수정 완료", post });
});

// 게시글 삭제
router.delete("/:id", authMiddleware, async (req: any, res: any) => {
    const postId = parseInt(req.params.id, 10);
    const user = req.user;
  
    const postRepo = AppDataSource.getRepository(Post);
    const post = await postRepo.findOne({
      where: { id: postId },
      relations: ["author"],
    });
  
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }
  
    if (post.author.id !== user.userId) {
      return res.status(403).json({ message: "본인 게시글만 삭제할 수 있습니다." });
    }
  
    await postRepo.remove(post);
  
    res.json({ message: "게시글 삭제 완료" });
});
export default router;
