import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';
import { BattleService } from '../../services/battleService/battle.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
})
export class RevealComponent {

  waitForVotes$ = new BehaviorSubject(false);
  summary$ = new BehaviorSubject(false);


  constructor(
    public gameService: GameService,
    public battleService: BattleService
  ) {
  }

  ngOnInit() {
    this.gameService.playerVote$.subscribe(votes => {
      this.waitForVotes$.next(votes.filter(vote => vote !== undefined).length !== 2)
    });
  }

  nextRound(): void {
    this.gameService.nextRound();
    this.summary$.next(false);
  }

  reveal(): void {
    this.waitForVotes$.next(false);
    this.summary$.next(true);
    this.gameService.reveal();
  }

  reset(): void {
    this.gameService.resetGame();
    this.summary$.next(false);
  }

}
