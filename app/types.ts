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
  lyrics?: string;
  released_at: Date | string;
  artist_id?: number;
  posted_by_id?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  youtube_link: string;
  artist?: Artist;
  posted_by?: User;
}

export interface AllLyrics {
  id: number;
  song_name: string;
  lyrics: string;
  released_at: Date | string;
  artist_id: number;
  posted_by_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  youtube_link: string;
  artist: Artist;
  posted_by: User;
}

export interface ShowArtist {
  id: number;
  name: string;
  profile_picture: string;
  about: string;
  created_at: string | Date;
  lyrics: Lyric[];
}

export interface TimedVerse {
  id?: number;
  lyric_id: number;
  verse: string;
  start: number | string;
  end: number | string;
  lyric?: AllLyrics;
}
