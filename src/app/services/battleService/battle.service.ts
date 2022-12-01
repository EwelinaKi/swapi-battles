import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../apiService/api.service';
import { BattleType, EBattle, IBattle, IBattleAttributes, } from '../models/battle.model';


@Injectable({
  providedIn: 'root'
})

export class BattleService implements OnInit {

  private readonly _battle = new BehaviorSubject<Array<IBattle<IBattleAttributes>> | null>(null);
  private readonly _battleType = new BehaviorSubject<BattleType>(EBattle.RANDOM);

  readonly battle$ = this._battle.asObservable();
  readonly battleType$ = this._battle.asObservable();

  constructor(private apiService: ApiService) {
  }

  set battleType(type: BattleType) {
    this._battleType.next(type);
  }

  get battleType(): BattleType {
    return this._battleType.getValue();
  }

  ngOnInit() {
    this.reloadBattle();
  }

  reloadBattle(): void {
    this.apiService.getNewBattle(this.battleType)
      .subscribe(
        resp => this._battle.next(resp)
      );
  }

}
