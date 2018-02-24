import { Component, ViewChild } from '@angular/core';
import { DataService } from './shared/data.service';
import { Pics } from './pic/pics.model';
import { WordService } from './shared/word.service';
import { Subject } from 'rxjs/Subject';
import { Pic } from './pic/pic.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalService } from './shared/modal.service';
import { PointsService } from './shared/points.service';
import { ActionService } from './actions/action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  difficulty: number;
  currentWordIndex: number;
  currentWord: string;
  currentPic: Pic;
  isModalShown: boolean = false;
  points: number;
  allRevealed: boolean = false;
  
  constructor(private dataService: DataService,
              private wordService: WordService,
              private modalService: ModalService,
              private pointService: PointsService,
              private actionService: ActionService) { }


  ngOnInit() {


    this.difficulty = this.wordService.currentDifficulty;

    this.points = this.pointService.currentPoints;

    this.wordService.setCurrentWord();

    this.currentPic = this.wordService.currentPic;

    this.wordService.currentWordChanged.subscribe((index) => {
      //this.wordService.setCurrentWord();
      this.currentPic = this.wordService.currentPic;
      this.actionService.resetActionTaken();      
    });

    this.wordService.wordMatch.subscribe(() => {
      this.modalService.modalData['title'] = 'Word Matched!';
      this.modalService.modalData['difficulty'] = this.wordService.currentDifficulty;
      this.modalService.modalData['points'] = this.pointService.currentPoints;
      this.difficulty = this.wordService.currentDifficulty;
      this.points = this.pointService.currentPoints
      this.modalService.openModal.next({modalName:'wordMatched', action:'', name:'', message:''});
    });

    this.wordService.difficultyChanged.subscribe(() => {
      this.difficulty = this.wordService.currentDifficulty;
      this.points = this.pointService.currentPoints
      this.modalService.openModal.next({modalName:'difficultyIncreased', action:'', name:'', message:''});
    });

    this.pointService.pointsUpdated.subscribe(() => {
      this.points = this.pointService.currentPoints;
    });

    this.actionService.allRevealed.subscribe((value) => {
      if (value === "all") {
        this.allRevealed = true;
        this.wordService.markAnswered(this.wordService.currentDifficulty, this.wordService.currentWordIndex);
      }
    });

    this.wordService.gameOver.subscribe(() => {
      this.modalService.openModal.next({modalName:'gameOver', action:'', name:'', message:''})
    });

  }

  onToggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onNext() {
    this.allRevealed = false;
    this.wordService.setCurrentWord();
    this.actionService.resetActionTaken();
  }

}
