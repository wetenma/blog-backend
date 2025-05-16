import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Post } from "./Post";
import { OneToMany } from "typeorm";
import { Comment } from "./Comment"; //댓글
import { Like } from "./Like";//좋아요
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];
}
