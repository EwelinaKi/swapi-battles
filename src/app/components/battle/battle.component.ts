import { Component, OnInit } from '@angular/core';
import { BattleService } from '../../services/battleService/battle.service';
import { BehaviorSubject } from 'rxjs';
import { EBattle, IComparable, IIncomparable } from '../../services/models/battle.model';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit {

  private readonly _comparablePlanetAttributes: IComparable[] = [
    'orbitalPeriod', 'rotationPeriod', 'diameter'
  ];
  private readonly _comparableStarshipAttributes: IComparable[] = [
    'length', 'crew', 'passengers', 'cost', 'population'
  ];
  private readonly _comparablePeopleAttributes: IComparable[] = [
    'mass', 'height'
  ];
  private readonly _incomparablePlanetAttributes: IIncomparable[] = [ 'climate', 'gravity' ];
  private readonly _incomparableStarshipAttributes: IIncomparable[] = [ 'model', 'manufacturer' ];
  private readonly _incomparablePeopleAttributes: IIncomparable[] = [ 'gender', 'birth' ];

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

  comparableAttributes$ = new BehaviorSubject<IComparable[]>([]);
  incomparableAttributes$ = new BehaviorSubject<IIncomparable[]>([]);

  constructor(public battleService: BattleService) {
  }

  ngOnInit(): void {
    this.battleService.reloadBattle();

    this.battleService.battleType$.subscribe(battleType => {
      switch (battleType) {
        case EBattle.PEOPLE:
          this.comparableAttributes$.next(this._comparablePeopleAttributes);
          this.incomparableAttributes$.next(this._incomparablePeopleAttributes);
          break;
        case EBattle.PLANETS:
          this.comparableAttributes$.next(this._comparablePlanetAttributes);
          this.incomparableAttributes$.next(this._incomparablePlanetAttributes);
          break;
        default:
          this.comparableAttributes$.next(this._comparableStarshipAttributes);
          this.incomparableAttributes$.next(this._incomparableStarshipAttributes);
          break;
      }
    })
  }


}
