export interface User {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}
export interface Artist {
  id?: number;
  name: string;
  profile_picture?: string;
  about: string;
  created_at?: string | Date;
}

export interface Lyric {
  id?: number;
  song_name: string;
  released_at: Date | string;
  lyrics: string;
  artist_id?: number;
  posted_by_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  youtube_link: string;
  artist?: Artist;
  posted_by?: User;
}
