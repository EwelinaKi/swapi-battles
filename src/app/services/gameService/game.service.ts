import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BattleService } from '../battleService/battle.service';


type AnswerType = 0 | 1 | null | 'tie';


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
  private readonly _isGameEnded = new BehaviorSubject<boolean>(false);
  private readonly _correctAnswer = new BehaviorSubject<AnswerType>(null);
  private readonly _roundFreeze = new BehaviorSubject<boolean>(false);

  readonly playerVote$ = this._playerVotes.asObservable();
  readonly correctAnswer$ = this._correctAnswer.asObservable();
  readonly roundFreeze$ = this._roundFreeze.asObservable();

  readonly scorePlayerOne$ = this._score.asObservable()
    .pipe(
      map(score => score[0])
    );
  readonly scorePlayerTwo$ = this._score.asObservable()
    .pipe(
      map(score => score[1])
    );

  readonly round$ = this._round.asObservable();
  readonly isGameEnded$ = this._isGameEnded.asObservable();

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

  get correctAnswer(): AnswerType {
    return this._correctAnswer.getValue();
  }

  constructor(private battleService: BattleService) {
  }

  vote(playerIndex: number, votedAttr: number): void {
    const newVotes = [
      playerIndex === 0 ? votedAttr : this.playerOneVote,
      playerIndex === 1 ? votedAttr : this.playerTwoVote
    ];
    this._playerVotes.next(newVotes);
  }

  reveal(): void {
    this._roundFreeze.next(true);
    if (!this.battleService.battle) {
      return;
    }

    const questionAttribute = this.battleService.questionAttribute;
    const attribute1 = this.battleService.battle[0][questionAttribute];
    const attribute2 = this.battleService.battle[1][questionAttribute];

    if (attribute1 === undefined || attribute2 === undefined) {
      this._correctAnswer.next(null);
      return;
    } else if (attribute1 === attribute2) {
      this._correctAnswer.next('tie');
      this.playerOneVote === attribute1 && this.addPointFor(0);
      this.playerTwoVote === attribute1 && this.addPointFor(1);
    } else {
      const result = attribute1 > attribute2 ? 0 : 1;
      this._correctAnswer.next(result);
      this.playerOneVote === result && this.addPointFor(0);
      this.playerTwoVote === result && this.addPointFor(1);
    }
  }

  nextRound(): void {
    this._round.next(this.round + 1);
    this._playerVotes.next(this._resetVotes);
    this.battleService.reloadBattle();
    this._isGameEnded.next(this.round === 2);
    this._correctAnswer.next(null);
    this._roundFreeze.next(false);
  }

  addPointFor(player: number): void {
    const newScore = [
      player === 0 ? this.scorePLayerOne + 1 : this.scorePLayerOne,
      player === 1 ? this.scorePLayerTwo + 1 : this.scorePLayerTwo
    ];

    this._score.next(newScore);
  }

  resetGame(): void {
    this._score.next(this._resetScore);
    this._round.next(this._resetRound);
    this._isGameEnded.next(false);
    this.resetPlayersVotes();
  }

  private resetPlayersVotes(): void {
    this._playerVotes.next([]);
  }

}
