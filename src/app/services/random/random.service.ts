import { Injectable } from '@angular/core';
import { BattleType, EBattle, IBattleAttributes } from "../models/battle.model";


@Injectable({
  providedIn: 'root'
})
export class RandomService {

  getRandomBattleType(): BattleType {
    const randomIndex = this.getRandomNumberFrom([ 0, Object.keys(EBattle).length - 1 ]);

    return Object.values(EBattle)[randomIndex];
  }

  getRandomPair(range: number[]): number[] {
    const random1 = this.getRandomNumberFrom(range);
    let random2 = this.getRandomNumberFrom(range);

    if (random1 === random2) {
      return this.getRandomPair(range);
    }

    return [ random1, random2 ];
  }

  getRandomAttribute(attributes: IBattleAttributes[]): IBattleAttributes {
    const index = this.getRandomNumberFrom([ 0, attributes.length - 1 ]);
    return attributes[index];
  }

  private getRandomNumberFrom(range: number[]): number {
    const [ min, max ] = range;
    return Math.floor(Math.random() * (max - min) + min);
  }
}
