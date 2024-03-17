import { Chapter } from './chapter.model';
import { Tag } from './tag.model';

export interface Stream {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  duration: number;
  broadcastId: number;
  broadcastAt: Date;
  thumbnailPath: string;
  thumbnailPaths: Array<string>;
  thumbnailUrls: Array<string>;
  videoUrl: string;
  chapters: Array<Chapter>;
  tags: Array<Tag>;
}
