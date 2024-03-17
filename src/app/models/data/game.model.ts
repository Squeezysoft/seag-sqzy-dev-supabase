export interface Game {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  slug: string;
  thumbnailUrl: string;
}
