export interface Job {
  job_id: number;
  title: string;
  owner_user_id: number;
  posted_date: string;
  price: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  TakenByUserId?: number;
  Images: Image[];
}

export interface Image {
  image_id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  job_id: number;
}
