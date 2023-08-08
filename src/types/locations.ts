export enum LocationType {
  Planet = 'Planet',
  Dimension = 'Dimension',
  Spacecraft = 'Spacecraft',
  Unknown = 'unknown',
}

export interface Location {
  name: string;
  type: LocationType;
  dimension: string;
}