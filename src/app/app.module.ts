import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { PicComponent } from './pic/pic.component';
import { LettersComponent } from './letters/letters.component';
import { LetterComponent } from './letters/letter/letter.component';
import { WordComponent } from './word/word.component';
import { DataService } from './shared/data.service';
import { WordService } from './shared/word.service';
import { PicsService } from './pic/pics.service';
import { WordLetterComponent } from './word/word-letter/word-letter.component';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './shared/modal.service';
import { PointsService } from './shared/points.service';
import { ActionsComponent } from './actions/actions.component';
import { ActionService } from "./actions/action.service";


@NgModule({
  declarations: [
    AppComponent,
    PicComponent,
    LettersComponent,
    LetterComponent,
    WordComponent,
    WordLetterComponent,
    ModalComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService, WordService, PicsService, PointsService, ModalService, ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
