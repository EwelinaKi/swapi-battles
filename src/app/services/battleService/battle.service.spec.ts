import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BattleService } from './battle.service';
import { ApiService } from '../apiService/api.service';
import { RandomService } from '../random/random.service';
import { EBattle, IBattle } from '../models/battle.model';


describe('BattleService', () => {
  let service: BattleService;
  let apiServiceSpy: ApiService;
  let randomServiceSpy: RandomService;

  const mockedBattles: IBattle[] = [
    {
      type: EBattle.PEOPLE,
      name: 'A',
      mass: 1,
      height: 1,
    },
    {
      type: EBattle.PEOPLE,
      name: 'B',
      mass: 2,
      height: 1,
    },
  ];

  const randomServiceMock = jasmine.createSpyObj('RandomService', [ 'getRandomAttribute', 'getRandomBattleType' ]);
  const apiServiceMock = jasmine.createSpyObj('ApiService', [ 'getNewBattle' ]);
  apiServiceMock.getNewBattle.and.returnValue(of(mockedBattles));
  randomServiceMock.getRandomBattleType.and.returnValue('mass');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: ApiService, useValue: apiServiceMock},
        {provide: RandomService, useValue: randomServiceMock},
      ]
    });
    service = TestBed.inject(BattleService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    randomServiceSpy = TestBed.inject(RandomService) as jasmine.SpyObj<RandomService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set question attribute', () => {
    service.questionAttribute = 'population';
    expect(service.questionAttribute).toEqual('population');

    service.questionAttribute = 'crew';
    expect(service.questionAttribute).toEqual('crew');
  });

  it('should reload battle', () => {
    expect(service.battle).toBeNull();
    expect(service.battleType).toBeTruthy();

    service.reloadBattle();
    expect(service.battle?.length).toEqual(2);
    expect(apiServiceSpy.getNewBattle).toHaveBeenCalled();
    expect(randomServiceSpy.getRandomAttribute).toHaveBeenCalled();
  });
});
