import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { BattleService } from '../battleService/battle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EBattle, IBattle } from '../models/battle.model';


describe('GameService', () => {
  let service: GameService;
  let battleServiceSpy: BattleService;

  const mockBattleValue: IBattle[] = [
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

  const battleServiceMock = jasmine.createSpyObj('BattleService',
    [ 'battle', 'reloadBattle', 'questionAttribute' ])
  ;

  // spyOnProperty(battleServiceMock, "battle", "get").and.returnValue(mockBattleValue);
  // workaround for upper code ↑
  (battleServiceMock as any).battle = mockBattleValue;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: BattleService, useValue: battleServiceMock}
      ]
    });
    service = TestBed.inject(GameService);
    battleServiceSpy = TestBed.inject(BattleService) as jasmine.SpyObj<BattleService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset game at start', () => {
    expect(service.round).toEqual(0);
    expect(service.playerOneVote).toBeUndefined();
    expect(service.playerTwoVote).toBeUndefined();
    expect(service.scorePLayerOne).toEqual(0);
    expect(service.scorePLayerTwo).toEqual(0);
    service.isGameEnded$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
  });

  it('should add points to players', () => {
    expect(service.scorePLayerOne).toEqual(0);
    expect(service.scorePLayerTwo).toEqual(0);

    service.addPointFor(0);
    expect(service.scorePLayerOne).toEqual(1);
    expect(service.scorePLayerTwo).toEqual(0);

    service.addPointFor(1);
    expect(service.scorePLayerOne).toEqual(1);
    expect(service.scorePLayerTwo).toEqual(1);
  });

  it('should change players votes', () => {
    expect(service.playerOneVote).toBeUndefined();
    expect(service.playerTwoVote).toBeUndefined();

    service.vote(0, 1);
    service.vote(1, 0);

    expect(service.playerOneVote).toEqual(1);
    expect(service.playerTwoVote).toEqual(0);
  });

  it('should change round', () => {
    service.vote(0, 0);
    service.vote(1, 0);

    service.nextRound();

    expect(service.round).toEqual(1);
    expect(service.playerOneVote).toBeUndefined();
    expect(service.playerTwoVote).toBeUndefined();
    expect(service.correctAnswer).toBeNull();
    expect(battleServiceSpy.reloadBattle).toHaveBeenCalled();
    service.isGameEnded$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeFalsy()).unsubscribe();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeFalsy()).unsubscribe();
  });

  it('should reveal with 1 correct answers', () => {
    service.vote(0, 0);
    service.vote(1, 1);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(1);
    expect(service.scorePLayerOne).toEqual(0);
    expect(service.scorePLayerTwo).toEqual(1);
  });

  it('should reveal with two correct answers', () => {
    service.vote(0, 1);
    service.vote(1, 1);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(1);
    expect(service.scorePLayerOne).toEqual(1);
    expect(service.scorePLayerTwo).toEqual(1);
  });

  it('should reveal with both incorrect answers', () => {
    service.vote(0, 0);
    service.vote(1, 0);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(1);
    expect(service.scorePLayerOne).toEqual(0);
    expect(service.scorePLayerTwo).toEqual(0);
  });

});
