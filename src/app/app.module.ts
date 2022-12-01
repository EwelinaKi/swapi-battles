import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScoreComponent } from './components/score/score.component';
import { RoundComponent } from './components/round/round.component';
import { BattleComponent } from './components/battle/battle.component';
import { VoteComponent } from './components/vote/vote.component';
import { HeaderComponent } from './components/header/header.component';
import { RevealComponent } from './components/reveal/reveal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { GameService } from './services/gameService/game.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    RoundComponent,
    BattleComponent,
    VoteComponent,
    HeaderComponent,
    RevealComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [
    GameService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
