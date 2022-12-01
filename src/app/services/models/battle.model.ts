export type BattleType = EBattle;

export enum EBattle {
  PEOPLE = 'people',
  STARSHIPS = 'starships',
  PLANETS = 'planets',
  RANDOM = 'random'
}

export type IBattleAttributes = IPeopleAttributes | IPlanetAttributes | IStarshipAttributes;

export interface IBattle<T> {
  type: BattleType,
  name: string,
  attributes: T,
}

export interface IPeopleAttributes {
  incomparable: {
    gender: string,
    birth: string,
  },
  comparable: {
    mass: number,
    height: number,
  }
}

export interface IPlanetAttributes {
  incomparable: {
    climate: string,
    terrain: string,
    gravity: string
  },
  comparable: {
    diameter: number,
    rotationPeriod: number,
    orbitalPeriod: number,
    population: number,
  }
}

export interface IStarshipAttributes {
  incomparable: {
    model: string,
    manufacturer: string,
  },
  comparable: {
    cost: number,
    length: number,
    passengers: number,
    crew: number,
  }
}
