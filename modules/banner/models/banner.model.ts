export interface ResponseBanner {
  id: number;
  backgroundColor: string;
  title: string;
  content: string;
  description: string;
  imageLink: string;
  pageLink?: string;
  ordering: number;
  expose: boolean;
  memo?: string;
}
