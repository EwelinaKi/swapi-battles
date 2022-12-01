import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GameService {

  private _resetScore = [ 0, 0 ];
  private _resetRound = 0;

  private readonly _score = new BehaviorSubject<number[]>(this._resetScore);
  private readonly _round = new BehaviorSubject(this._resetRound);

  readonly scorePlayerOne$ = this._score.asObservable()
    .pipe(
      map(score => score[0])
    );
  readonly scorePlayerTwo$ = this._score.asObservable()
    .pipe(
      map(score => score[1])
    );

  readonly round$ = this._round.asObservable();

  get scorePLayerOne(): number {
    return this._score.getValue()[0];
  }

  get scorePLayerTwo(): number {
    return this._score.getValue()[1];
  }

  get round(): number {
    return this._round.getValue();
  }

  resetGame(): void {
    this._score.next(this._resetScore);
    this._round.next(this._resetRound);
  }

  nextRound(): void {
    this._round.next(this.round + 1);
  }

  addPointFor(player: number): void {
    const newScore = [
      player === 0 ? this.scorePLayerOne + 1 : this.scorePLayerOne,
      player === 1 ? this.scorePLayerTwo + 1 : this.scorePLayerTwo
    ];

    this._score.next(newScore);
  }

  isEndGame(): boolean {
    return this.round === 2;
  }

}
