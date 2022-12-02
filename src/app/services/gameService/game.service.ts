import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GameService {

  private _resetScore = [ 0, 0 ];
  private _resetRound = 0;
  private _resetVotes = [];


  private readonly _score = new BehaviorSubject<number[]>(this._resetScore);
  private readonly _round = new BehaviorSubject(this._resetRound);
  private readonly _playerVotes = new BehaviorSubject<number[]>(this._resetVotes);

  readonly scorePlayerOne$ = this._score.asObservable()
    .pipe(
      map(score => score[0])
    );
  readonly scorePlayerTwo$ = this._score.asObservable()
    .pipe(
      map(score => score[1])
    );

  readonly playerOneVote$ = this._playerVotes.asObservable()
    .pipe(
      map(votes => votes[0])
    );
  readonly playerTwoVote$ = this._playerVotes.asObservable()
    .pipe(
      map(votes => votes[1])
    );

  readonly round$ = this._round.asObservable();

  get scorePLayerOne(): number {
    return this._score.getValue()[0];
  }

  get scorePLayerTwo(): number {
    return this._score.getValue()[1];
  }

  get playerOneVote(): number {
    return this._playerVotes.getValue()[0];
  }

  get playerTwoVote(): number {
    return this._playerVotes.getValue()[1];
  }

  get round(): number {
    return this._round.getValue();
  }

  vote(playerIndex: number, votedAttr: number): void {
    const newVotes = [
      playerIndex === 0 ? votedAttr : this.playerOneVote,
      playerIndex === 1 ? votedAttr : this.playerTwoVote
    ];
    this._playerVotes.next(newVotes);
  }

  nextRound(): void {
    this._round.next(this.round + 1);
    this._playerVotes.next(this._resetVotes);
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

  resetGame(): void {
    this._score.next(this._resetScore);
    this._round.next(this._resetRound);
    this.resetPlayersVotes();
  }

  private resetPlayersVotes(): void {
    this._playerVotes.next([]);
  }

}
