export type BattleType = EBattle;

export enum EBattle {
  PEOPLE = 'people',
  STARSHIPS = 'starships',
  PLANETS = 'planets',
  RANDOM = 'random'
}

export interface IBattle extends IIncomparableAttr, IComparableAttr {
  type: BattleType,
  name: string,
}

export interface IIncomparableAttr {
  model?: string,
  manufacturer?: string,
  climate?: string,
  terrain?: string,
  gravity?: string
  gender?: string,
  birth?: string,
}

export interface IComparableAttr {
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

export type IComparable = keyof IComparableAttr;
export type IIncomparable = keyof IIncomparableAttr;
