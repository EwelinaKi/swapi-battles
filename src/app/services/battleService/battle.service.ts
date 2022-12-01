import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../apiService/api.service';
import { EBattle, IBattle } from '../models/battle.model';
import { RandomService } from '../random/random.service';


@Injectable({
  providedIn: 'root'
})

export class BattleService implements OnInit {

  private readonly _battle = new BehaviorSubject<Array<IBattle> | null>(null);
  private readonly _battleType = new BehaviorSubject<EBattle>(this.randomService.getRandomBattleType());

  readonly battle$ = this._battle.asObservable();
  readonly battleType$ = this._battleType.asObservable();

  constructor(private apiService: ApiService, private randomService: RandomService) {
  }

  get battleType(): EBattle {
    return this._battleType.getValue();
  }

  ngOnInit() {
    this.reloadBattle();
  }

  reloadBattle(): void {
    this.apiService.getNewBattle(this.battleType)
      .subscribe(
        resp => {
          this._battle.next(resp)
        },
        (err) => {
          if (err.status = 404) {
            this.reloadBattle();
          } else {
            console.log(err);
          }
        }
      );
  }

}
