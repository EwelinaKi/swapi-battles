import { TestBed } from '@angular/core/testing';
import { EAnswer, GameService } from './game.service';
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
    expect(service.playerOneScore).toEqual(0);
    expect(service.playerTwoScore).toEqual(0);
    service.isGameEnded$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
  });

  it('should change players votes', () => {
    expect(service.playerOneVote).toBeUndefined();
    expect(service.playerTwoVote).toBeUndefined();

    service.vote(0, EAnswer.SECOND_TILE);
    service.vote(1, EAnswer.FIRST_TILE);

    expect(service.playerOneVote).toEqual(EAnswer.SECOND_TILE);
    expect(service.playerTwoVote).toEqual(EAnswer.FIRST_TILE);
  });

  it('should change round', () => {
    service.vote(0, EAnswer.FIRST_TILE);
    service.vote(1, EAnswer.FIRST_TILE);

    service.nextRound();

    expect(service.round).toEqual(1);
    expect(service.playerOneVote).toEqual(EAnswer.FIRST_TILE);
    expect(service.playerTwoVote).toEqual(EAnswer.FIRST_TILE);
    expect(service.correctAnswer).toEqual(EAnswer.NOT_GIVEN);
    expect(battleServiceSpy.reloadBattle).toHaveBeenCalled();
    service.isGameEnded$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeFalsy()).unsubscribe();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeFalsy()).unsubscribe();
  });

  it('should reveal with 1 correct answers ans add point', () => {
    service.vote(0, EAnswer.FIRST_TILE);
    service.vote(1, EAnswer.SECOND_TILE);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(EAnswer.SECOND_TILE);
    expect(service.playerOneScore).toEqual(0);
    expect(service.playerTwoScore).toEqual(1);
  });

  it('should reveal with two correct answers and add points', () => {
    service.vote(0, EAnswer.SECOND_TILE);
    service.vote(1, EAnswer.SECOND_TILE);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(EAnswer.SECOND_TILE);
    expect(service.playerOneScore).toEqual(1);
    expect(service.playerTwoScore).toEqual(1);
  });

  it('should reveal with both incorrect answers and dont add points', () => {
    service.vote(0, EAnswer.FIRST_TILE);
    service.vote(1, EAnswer.FIRST_TILE);

    (battleServiceMock as any).questionAttribute = 'mass';

    service.reveal();
    service.roundFreeze$.subscribe(isGameEnded =>
      expect(isGameEnded).toBeTruthy()).unsubscribe();
    expect(service.correctAnswer).toEqual(EAnswer.SECOND_TILE);
    expect(service.playerOneScore).toEqual(0);
    expect(service.playerTwoScore).toEqual(0);
  });

});
