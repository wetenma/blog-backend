import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";
import likeRoutes from "./routes/like.routes";

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/auth", authRoutes);   // 로그인/회원가입
app.use("/posts", postRoutes);  // 게시글 작성 확인 수정 삭제
app.use("/posts", commentRoutes); // POST /posts/:id/comments 와 호환됨
app.use("/posts", likeRoutes); // POST /posts/:id/like

AppDataSource.initialize().then(() => {
  console.log("✅ DB 연결 성공");
  app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌ DB 연결 실패:", error);
});
