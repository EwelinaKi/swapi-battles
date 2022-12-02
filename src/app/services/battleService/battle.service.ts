import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../apiService/api.service';
import { EBattle, IBattle, IBattleAttributes, IBattleData } from '../models/battle.model';
import { RandomService } from '../random/random.service';


@Injectable({
  providedIn: 'root'
})

export class BattleService {

  private readonly _planetAttributes: IBattleAttributes[] = [
    'orbitalPeriod', 'rotationPeriod', 'diameter'
  ];
  private readonly _starshipAttributes: IBattleAttributes[] = [
    'length', 'crew', 'passengers', 'cost', 'population'
  ];
  private readonly _peopleAttributes: IBattleAttributes[] = [
    'mass', 'height'
  ];
  private readonly _planetData: IBattleData[] = [ 'climate', 'gravity' ];
  private readonly _starshipData: IBattleData[] = [ 'model', 'manufacturer' ];
  private readonly _peopleData: IBattleData[] = [ 'gender', 'birth' ];

  private readonly _battle = new BehaviorSubject<Array<IBattle> | null>(null);
  private readonly _battleType = new BehaviorSubject<EBattle>(this.randomService.getRandomBattleType());
  private readonly _battleAttributes = new BehaviorSubject<IBattleAttributes[]>([]);
  private readonly _battleData = new BehaviorSubject<IBattleData[]>([]);
  private readonly _questionAttribute = new BehaviorSubject<IBattleAttributes>(this.randomService.getRandomAttribute(this.battleAttributes));

  readonly battle$ = this._battle.asObservable();
  readonly battleType$ = this._battleType.asObservable();
  readonly battleAttributes$ = this._battleAttributes.asObservable();
  readonly battleData$ = this._battleData.asObservable();
  readonly questionAttribute$ = this._questionAttribute.asObservable();

  constructor(private apiService: ApiService, private randomService: RandomService) {
  }

  get battleType(): EBattle {
    return this._battleType.getValue();
  }

  get battleAttributes(): IBattleAttributes[] {
    return this._battleAttributes.getValue();
  }

  get questionAttribute(): IBattleAttributes {
    return this._questionAttribute.getValue();
  }

  set questionAttribute(attribute: IBattleAttributes) {
    this._questionAttribute.next(attribute);
  }

  reloadBattle(): void {
    switch (this.battleType) {
      case EBattle.PEOPLE:
        this._battleAttributes.next(this._peopleAttributes);
        this._battleData.next(this._peopleData);
        break;
      case EBattle.PLANETS:
        this._battleAttributes.next(this._planetAttributes);
        this._battleData.next(this._planetData);
        break;
      default:
        this._battleAttributes.next(this._starshipAttributes);
        this._battleData.next(this._starshipData);
        break;
    }

    this.questionAttribute = this.randomService.getRandomAttribute(this.battleAttributes);

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
