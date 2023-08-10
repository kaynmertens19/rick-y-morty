export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

export enum CharacterGender {
  Male = 'Male',
  Female = 'Female',
  Genderless = 'Genderless',
  Unknown = 'unknown',
}

export interface Character {
  name: string;
  status: CharacterStatus;
  species: string;
  gender: CharacterGender;
  image: string;
  url: string;
  id: string;
  episode: string[];
}