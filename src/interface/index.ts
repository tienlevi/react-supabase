export interface Player {
  id?: string;
  name: string;
  price: number;
  image: string;
  club: string;
  created_at: string;
}

export interface Club {
  id?: string;
  name: string;
}
