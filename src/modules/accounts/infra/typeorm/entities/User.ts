import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { port } from "../../../../../shared/infra/http/app";

@Entity("users")
@Unique(["email", "driver_license"])
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.STORAGE_PROVIDER) {
      case "s3":
        return `${process.env.AWS_BUCKET_URL}avatar/${this.avatar}`;
      case "local":
        return `http://localhost:${port}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
