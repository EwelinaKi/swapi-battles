import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';
import { BattleService } from '../../services/battleService/battle.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
})
export class VoteComponent {

  constructor(
    public gameService: GameService,
    public battleService: BattleService
  ) {
  }

}
