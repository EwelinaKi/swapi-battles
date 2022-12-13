import { Component, OnInit } from '@angular/core';
import { BattleService } from '../../services/battleService/battle.service';
import { IBattleAttributes } from '../../services/models/battle.model';
import { EAnswer, GameService } from '../../services/gameService/game.service';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: [ './battle.style.scss' ],
})
export class BattleComponent implements OnInit {

  notGiven = EAnswer.NOT_GIVEN;

  readonly labels: { [key: string]: string } = {
    gender: 'Gender',
    birth: 'Date of birth',
    mass: 'Weight',
    height: "Height",
    climate: "Climate",
    gravity: "Gravity",
    diameter: "Diameter",
    rotationPeriod: "Rotation period",
    orbitalPeriod: "Orbital period",
    population: 'Population',
    model: 'Model',
    manufacturer: "Manufacturer",
    cost: "Cost",
    passengers: "Passengers",
    crew: "Crew",
    length: "Length",
  }

  constructor(
    public battleService: BattleService,
    public gameService: GameService
  ) {
  }

  ngOnInit(): void {
    this.battleService.reloadBattle();
  }

  updateQuestion(attribute: IBattleAttributes) {
    this.battleService.questionAttribute = attribute;
  }

}
