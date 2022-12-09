import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';
import { BattleService } from '../../services/battleService/battle.service';


@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: [ './round.style.scss' ],
})
export class RoundComponent {

  constructor(
    public gameService: GameService,
    public battleService: BattleService
  ) {
  }

}
