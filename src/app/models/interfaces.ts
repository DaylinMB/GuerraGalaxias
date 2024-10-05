// models.interfaces.ts
export interface Starship {
  id: string;  // Asegúrate de que el ID esté aquí
  name: string;
  model: string;
  url: string;
  image?: string;
}

export interface StarshipDetails extends Starship {
  manufacturer: string;
  cost_in_credits?: string;
  length?: string;
  max_atmosphering_speed?: string;
  cargo_capacity?: string;
  passengers?: string;
  starship_class?: string;
  image?: string;
  url: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}




export interface PilotsData {
  index: string;
  imgUrl: string;
  pilot: Character;
}

export interface ResponseHandle {
  success: any | null;
  error: any | null;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmData {
  index: string;
  imgUrl: string;
  film: Film;
}