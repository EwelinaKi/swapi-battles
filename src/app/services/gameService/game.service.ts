import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BattleService } from '../battleService/battle.service';
import { IBattle } from '../models/battle.model';


export enum EAnswer {
  TIE,
  FIRST_TILE,
  SECOND_TILE,
  NOT_GIVEN
}

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private readonly FIRST_TILE = 0;
  private readonly SECOND_TILE = 1;

  private _initialScore = [ 0, 0 ];
  private _initialRound = 0;
  private _gameLength = 3;
  private _initialVotes = [];

  private readonly _score = new BehaviorSubject<number[]>(this._initialScore);
  private readonly _round = new BehaviorSubject(this._initialRound);
  private readonly _playerVotes = new BehaviorSubject<number[]>(this._initialVotes);
  private readonly _isGameEnded = new BehaviorSubject<boolean>(true);
  private readonly _correctAnswer = new BehaviorSubject<EAnswer>(EAnswer.NOT_GIVEN);
  private readonly _roundFreeze = new BehaviorSubject<boolean>(false);

  readonly playerVote$ = this._playerVotes.asObservable();
  readonly correctAnswer$ = this._correctAnswer.asObservable();
  readonly roundFreeze$ = this._roundFreeze.asObservable();

  readonly playerOneScore$ = this._score.asObservable()
    .pipe(
      map(score => score[0])
    );
  readonly playerTwoScore$ = this._score.asObservable()
    .pipe(
      map(score => score[1])
    );

  readonly round$ = this._round.asObservable();
  readonly isGameEnded$ = this._isGameEnded.asObservable();

  get playerOneScore(): number {
    return this._score.getValue()[0];
  }

  get playerTwoScore(): number {
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

  get correctAnswer(): EAnswer {
    return this._correctAnswer.getValue();
  }

  get gameLength() {
    return this._gameLength;
  }

  constructor(private battleService: BattleService) {
  }

  vote(playerIndex: number, votedAttr: number): void {
    const newVotes = this._playerVotes.getValue();
    newVotes[playerIndex] = votedAttr;
    this._playerVotes.next(newVotes);
  }

  reveal(): void {
    this._roundFreeze.next(true);

    const battle = this.battleService.battle;
    if (!battle) {
      return;
    }

    if (this.notAllAttributesDefined(battle)) {
      this._correctAnswer.next(EAnswer.NOT_GIVEN);
      return;
    } else if (this.attributesAreEqual(battle)) {
      this._correctAnswer.next(EAnswer.TIE);
      this.addPointForAll();
    } else {
      const result = this.winningAttribute(battle);
      this._correctAnswer.next(result);
      this._playerVotes.getValue().forEach((playerVote, playerIndex) => {
        EAnswer[playerVote] === EAnswer[result] && this.addPointFor(playerIndex)
      })
    }
  }

  nextRound(): void {
    this._round.next(this.round + 1);
    this._playerVotes.next(this._initialVotes);
    this.battleService.reloadBattle();
    this._isGameEnded.next(this.round === this.gameLength);
    this._correctAnswer.next(EAnswer.NOT_GIVEN);
    this._roundFreeze.next(false);

    if (this._isGameEnded.getValue()) {
      this._score.next(this._initialScore);
    }
  }

  resetGame(): void {
    this._score.next(this._initialScore);
    this._round.next(this._initialRound);
    this._isGameEnded.next(false);
    this.resetPlayersVotes();
  }

  private addPointFor(player: number): void {
    const newScore = this._score.getValue();
    newScore[player] += 1;

    this._score.next(newScore);
  }

  private addPointForAll(): void {
    const newScore = this._score.getValue().map(score => score + 1)
    this._score.next(newScore);
  }

  private resetPlayersVotes(): void {
    this._playerVotes.next([]);
  }

  private notAllAttributesDefined(battle: IBattle[]): boolean {
    const questionAttribute = this.battleService.questionAttribute;

    return battle[this.FIRST_TILE][questionAttribute] === null ||
      battle[this.SECOND_TILE][questionAttribute] === null
  }

  private attributesAreEqual(battle: IBattle[]): boolean {
    const questionAttribute = this.battleService.questionAttribute;

    return battle[this.FIRST_TILE][questionAttribute] ===
      battle[this.SECOND_TILE][questionAttribute];
  }

  private winningAttribute(battle: IBattle[]): EAnswer {
    const questionAttribute = this.battleService.questionAttribute;

    // TS2532: Object is possibly 'undefined' <-- Condition checked before function was invoked
    // @ts-ignore
    return battle[this.FIRST_TILE][questionAttribute] > battle[this.SECOND_TILE][questionAttribute]
      ? EAnswer.FIRST_TILE : EAnswer.SECOND_TILE;
  }

}
