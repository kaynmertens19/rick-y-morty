// objects to create the interface to interact with hte information of the locations

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