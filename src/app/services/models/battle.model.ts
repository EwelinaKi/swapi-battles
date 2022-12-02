export type BattleType = EBattle;

export enum EBattle {
  PEOPLE = 'people',
  STARSHIPS = 'starships',
  PLANETS = 'planets',
  RANDOM = 'random'
}

export interface IBattle extends IData, IAttributes {
  type: BattleType,
  name: string,
}

interface IData {
  model?: string,
  manufacturer?: string,
  climate?: string,
  terrain?: string,
  gravity?: string
  gender?: string,
  birth?: string,
}

interface IAttributes {
  diameter?: number,
  rotationPeriod?: number,
  orbitalPeriod?: number,
  population?: number,
  cost?: number,
  length?: number,
  passengers?: number,
  crew?: number,
  mass?: number,
  height?: number,
}

export type IBattleAttributes = keyof IAttributes;
export type IBattleData = keyof IData;
