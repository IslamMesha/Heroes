export interface Hero {
  id: number;
  name?: string;
  power?: string;
  rate: number;
  is_superuser?: boolean;
}

export interface AuthData {
  access: string;
  refresh: string;
  hero: Hero;
}

export interface HeroConfig {
  count: number;
  next?: string;
  previous?: string;
  results: Hero[];
}
