export interface ResponseComment {
  id: number;
  content: string;
  createdDate: string;
  modifiedDate: string;
  name: string;
  picture: string;
  postId: number;
  parentId?: number;
  childList?: ResponseComment[];
  removed: boolean;
}
