import { Component, OnInit } from '@angular/core';
import { BattleService } from '../../services/battleService/battle.service';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit {

  constructor(public battleService: BattleService) {
  }

  ngOnInit(): void {
    this.battleService.reloadBattle();

    this.battleService.battle$.subscribe(battle => console.log('battle', battle))
  }

}
