export interface IPeopleDto {
  name: string,
  height: number,
  mass: number,
  birth: string,
  gender: string,
}

export interface IStarshipsDto {
  name: string,
  model: string,
  manufacturer: string,
  cost_in_credits: number,
  length: number,
  crew: number,
  passengers: number,
}

export interface IPlanetsDto {
  name: string,
  rotation_period: number,
  orbital_period: number,
  diameter: number,
  climate: string,
  gravity: string,
  terrain: string,
  population: number,
}
