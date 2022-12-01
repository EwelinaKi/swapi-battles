import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
})
export class VoteComponent {

  constructor(public gameService: GameService) {
  }

  addPoints(player: number): void {
    this.gameService.addPointFor(player);
  }


}
