import { User } from './User';

export type Article = {
  id: number;
  title: string;
  content: string;
  users: User[];
};
