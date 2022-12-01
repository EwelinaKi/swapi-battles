import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';

import { RandomService } from '../random/random.service';
import {
  BattleType,
  EBattle,
  IBattle,
  IBattleAttributes,
  IPeopleAttributes,
  IPlanetAttributes,
  IStarshipAttributes
} from '../models/battle.model';
import { IPeopleDto, IPlanetsDto, IStarshipsDto } from '../models/dto.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly SWAPI = 'https://swapi.dev/api';
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

  getNewBattle(battleType: BattleType): Observable<Array<IBattle<IBattleAttributes>>> {
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

  private fetchPeople(): Observable<Array<IBattle<IPeopleAttributes>>> {
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
              attributes: {
                incomparable: {
                  gender: resp.gender || '',
                  birth: resp.birth || '',
                },
                comparable: {
                  mass: Number(resp.mass) || 0,
                  height: Number(resp.height) || 0,
                }
              }
            }
          ))
        )
      );
  }

  private fetchStarships(): Observable<Array<IBattle<IStarshipAttributes>>> {
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
              attributes: {
                incomparable: {
                  model: resp.model || '',
                  manufacturer: resp.manufacturer || '',
                },
                comparable: {
                  cost: Number(resp.cost_in_credits) || 0,
                  length: Number(resp.length) || 0,
                  passengers: Number(resp.passengers) || 0,
                  crew: Number(resp.crew) || 0,
                }
              }
            }
          ))
        )
      );
  }

  private fetchPlanets(): Observable<Array<IBattle<IPlanetAttributes>>> {
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
              attributes: {
                incomparable: {
                  climate: resp.climate || '',
                  terrain: resp.terrain || '',
                  gravity: resp.gravity || '',
                },
                comparable: {
                  diameter: Number(resp.diameter) || 0,
                  rotationPeriod: Number(resp.rotation_period) || 0,
                  orbitalPeriod: Number(resp.orbital_period) || 0,
                  population: Number(resp.population) || 0,
                }
              }
            }
          ))
        )
      );
  }

}
