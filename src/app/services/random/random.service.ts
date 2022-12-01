import { Injectable } from '@angular/core';
import { BattleType, EBattle } from "../models/battle.model";


@Injectable({
  providedIn: 'root'
})
export class RandomService {

  getRandomNumberFromRange(range: number[]): number {
    const [ min, max ] = range;
    return Math.floor(Math.random() * (max - min) + min);
  }

  getRandomBattleType(): BattleType {
    const random = this.getRandomNumberFromRange([ 1, 3 ]);

    switch (random) {
      case 1:
        return EBattle.PLANETS;
      case 2:
        return EBattle.STARSHIPS;
      default:
        return EBattle.PEOPLE;
    }
  }

  getRandomPair(range: number[]): number[] {
    const random1 = this.getRandomNumberFromRange(range);
    let random2 = this.getRandomNumberFromRange(range);

    if (random1 === random2) {
      this.getRandomPair(range);
    }

    return [ random1, random2 ];
  }
}
