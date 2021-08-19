export interface TwitterMessage {
  id: string;
  user: User;
  entities: Entities;
  place: Place;
  text: string;
}

export interface User {
  name: string;
  screen_name: string;
}

export interface Entities {
  hashtags: Hashtag[];
}

export interface Hashtag {
  indices: number[];
  text: string;
}

export interface Place {
  country: string;
  country_code: string;
  name: string;
  full_name: string;
}
