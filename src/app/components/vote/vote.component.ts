import { Component } from '@angular/core';
import { EAnswer, GameService } from '../../services/gameService/game.service';
import { BattleService } from '../../services/battleService/battle.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: [ './vote.style.scss' ],
})
export class VoteComponent {

  answer = EAnswer;

  constructor(
    public gameService: GameService,
    public battleService: BattleService
  ) {
  }

}
