import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import uploadsConfig from '@config/upload';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarURL(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadsConfig.driver) {
      case 'disk':
        return `${uploadsConfig.config.disk.url}/${this.avatar}`;

      case 's3':
        return `${uploadsConfig.config.s3.url}/${this.avatar}`;

      default:
        return null;
    }
  }
}
