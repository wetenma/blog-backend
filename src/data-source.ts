import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";//유저 등록
import { Post } from "./entity/Post";//post 등록
import { Comment } from "./entity/Comment";//댓글
import { Like } from "./entity/Like";//좋아요

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",           // ← 사용자 환경에 맞게 설정
  password: "Tngusj00723.",
  database: "blogdb",         // ← 미리 만들어두었거나 만들 예정인 DB 이름
  synchronize: true,
  logging: true,
  entities: [User, Post,Comment,Like],
  migrations: [],
  subscribers: [],
});
