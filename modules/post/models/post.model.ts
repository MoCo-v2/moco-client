export interface ResponsePost {
  id: number;
  title: string;
  content: string;
  type: string;
  capacity: string;
  mode: string;
  duration: string;
  techStack: string;
  recruitmentPosition: string;
  deadLine: string;
  contact_method: string;
  link: string;
  view: number;
  commentCnt: number;
  created_date: string;
  userId: string;
  writer: string;
  picture: string;
  full: boolean;
  removed: boolean;
}

export interface WritePostData {
  title: string;
  content: string;
  type: string;
  capacity: string;
  mode: string;
  duration: string;
  techStack: string;
  recruitmentPosition: string;
  deadLine: string;
  contact_method: string;
  link: string;
}
