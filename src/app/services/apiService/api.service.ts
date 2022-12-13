import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

import { RandomService } from '../random/random.service';
import { EBattle, IBattle } from '../models/battle.model';
import { IPeopleDto, IPlanetsDto, IStarshipsDto } from '../models/dto.model';


enum EUndefinedValue {
  UNDEFINED_LITERAL = 'N/A',
  UNDEFINED_NUMBER = 0
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly SWAPI = 'https://swapi.py4e.com/api';
  private readonly PEOPLE_URL = `${this.SWAPI}/people/`;
  private readonly PLANETS_URL = `${this.SWAPI}/planets/`;
  private readonly STARSHIPS_URL = `${this.SWAPI}/starships/`;

  private readonly PEOPLE_RANGE = [ 1, 84 ];
  private readonly PLANETS_RANGE = [ 1, 60 ];
  private readonly STARSHIPS_RANGE = [ 1, 15 ];

  constructor(
    private http: HttpClient,
    private randomService: RandomService
  ) {
  }

  getNewBattle(battleType: EBattle): Observable<Array<IBattle>> {

    if (battleType === EBattle.RANDOM) {
      battleType = this.randomService.getRandomBattleType();
    }

    switch (battleType) {
      case EBattle.PEOPLE:
        return this.fetchPeople();
      case EBattle.PLANETS:
        return this.fetchPlanets();
      default:
        return this.fetchStarships();
    }
  }

  private fetchPeople(): Observable<Array<IBattle>> {
    const [ random1, random2 ] = this.randomService.getRandomPair(this.PEOPLE_RANGE);

    return forkJoin([
      this.http.get<IPeopleDto>(this.PEOPLE_URL + random1),
      this.http.get<IPeopleDto>(this.PEOPLE_URL + random2)
    ])
      .pipe(
        map(responces => responces
          .map(resp => ({
              type: EBattle.PEOPLE,
              name: resp.name,
              gender: resp.gender || EUndefinedValue.UNDEFINED_LITERAL,
              birth: resp.birth || EUndefinedValue.UNDEFINED_LITERAL,
              mass: Number(resp.mass) || EUndefinedValue.UNDEFINED_NUMBER,
              height: Number(resp.height) || EUndefinedValue.UNDEFINED_NUMBER
            }
          ))
        )
      );
  }

  private fetchStarships(): Observable<Array<IBattle>> {
    const [ random1, random2 ] = this.randomService.getRandomPair(this.STARSHIPS_RANGE);

    return forkJoin([
      this.http.get<IStarshipsDto>(this.STARSHIPS_URL + random1),
      this.http.get<IStarshipsDto>(this.STARSHIPS_URL + random2)
    ])
      .pipe(
        map(responces => responces
          .map(resp => ({
              type: EBattle.STARSHIPS,
              name: resp.name,
              model: resp.model || EUndefinedValue.UNDEFINED_LITERAL,
              manufacturer: resp.manufacturer || EUndefinedValue.UNDEFINED_LITERAL,
              cost: Number(resp.cost_in_credits) || EUndefinedValue.UNDEFINED_NUMBER,
              length: Number(resp.length) || EUndefinedValue.UNDEFINED_NUMBER,
              passengers: Number(resp.passengers) || EUndefinedValue.UNDEFINED_NUMBER,
              crew: Number(resp.crew) || EUndefinedValue.UNDEFINED_NUMBER,
            }
          ))
        )
      );
  }

  private fetchPlanets(): Observable<Array<IBattle>> {
    const [ random1, random2 ] = this.randomService.getRandomPair(this.PLANETS_RANGE);

    return forkJoin([
      this.http.get<IPlanetsDto>(this.PLANETS_URL + random1),
      this.http.get<IPlanetsDto>(this.PLANETS_URL + random2)
    ])
      .pipe(
        map(responces => responces
          .map(resp => ({
              type: EBattle.PLANETS,
              name: resp.name,
              climate: resp.climate || EUndefinedValue.UNDEFINED_LITERAL,
              terrain: resp.terrain || EUndefinedValue.UNDEFINED_LITERAL,
              gravity: resp.gravity || EUndefinedValue.UNDEFINED_LITERAL,
              diameter: Number(resp.diameter) || EUndefinedValue.UNDEFINED_NUMBER,
              rotationPeriod: Number(resp.rotation_period) || EUndefinedValue.UNDEFINED_NUMBER,
              orbitalPeriod: Number(resp.orbital_period) || EUndefinedValue.UNDEFINED_NUMBER,
              population: Number(resp.population) || EUndefinedValue.UNDEFINED_NUMBER,
            }
          ))
        )
      );
  }

}
