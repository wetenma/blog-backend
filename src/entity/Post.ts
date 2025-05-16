import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment"; //댓글
import { OneToMany } from "typeorm";
import { Like } from "./Like";//좋아요 

@Entity()
export class Post {
 @PrimaryGeneratedColumn()
id!: number;
  
 @Column()
 title!: string;
  
 @Column("text")
 content!: string;
  
 @CreateDateColumn()
 createdAt!: Date;
  
 @ManyToOne(() => User, (user) => user.posts)
 author!: User;

 @OneToMany(() => Comment, (comment) => comment.post)
 comments!: Comment[];

 @OneToMany(() => Like, (like) => like.post)
 likes!: Like[];
}
