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
