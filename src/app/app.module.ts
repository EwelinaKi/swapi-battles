import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { GameService } from './services/gameService/game.service';
import { BattleService } from './services/battleService/battle.service';
import { ApiService } from './services/apiService/api.service';
import { RandomService } from './services/random/random.service';

import { AppComponent } from './app.component';
import { ScoreComponent } from './components/score/score.component';
import { RoundComponent } from './components/round/round.component';
import { BattleComponent } from './components/battle/battle.component';
import { VoteComponent } from './components/vote/vote.component';
import { RevealComponent } from './components/reveal/reveal.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    RoundComponent,
    BattleComponent,
    VoteComponent,
    RevealComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ApiService,
    RandomService,
    GameService,
    BattleService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
