import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Unique,
    CreateDateColumn,
  } from "typeorm";
  import { User } from "./User";
  import { Post } from "./Post";
  
  @Entity()
  @Unique(["user", "post"]) // 1유저 1포스트 1좋아요 제한
  export class Like {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.likes)
    user!: User;
  
    @ManyToOne(() => Post, (post) => post.likes)
    post!: Post;
  
    @CreateDateColumn()
    createdAt!: Date;
  }
  