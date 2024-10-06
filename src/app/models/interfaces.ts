// models.interfaces.ts
export interface Starship {
  id: string;
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
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  url: string;
}

export interface PilotsData {
  index: string;
  imgUrl: string;
  pilot: Character;
}