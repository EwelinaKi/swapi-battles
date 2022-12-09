import { Component } from '@angular/core';
import { GameService } from '../../services/gameService/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [ './score.style.scss' ],
})
export class ScoreComponent {

  constructor(public gameService: GameService) { }

}
