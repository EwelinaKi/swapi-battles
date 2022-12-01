import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
})
export class RoundComponent {

  constructor(public gameService: GameService) { }

}
