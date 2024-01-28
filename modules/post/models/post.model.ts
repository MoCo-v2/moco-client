export interface ResponsePost {
  id: number;
  title: string;
  content: string;
  type: 'project' | 'study' | 'moco' | 'lesson' | '';
  capacity: string;
  mode: string;
  duration: string;
  techStack: string;
  recruitmentPosition: string;
  deadLine: string;
  contactMethod: string;
  link: string;
  view: number;
  commentCnt: number;
  createdDate: string;
  userId: string;
  writer: string;
  picture: string;
  full: boolean;
  removed: boolean;
}

export interface WritePostData {
  title: string;
  content: string;
  type: 'project' | 'study' | 'moco' | 'lesson' | '';
  capacity: string;
  mode: string;
  duration: string;
  techStack: string;
  recruitmentPosition: string;
  deadLine: string;
  contactMethod: string;
  link: string;
}
