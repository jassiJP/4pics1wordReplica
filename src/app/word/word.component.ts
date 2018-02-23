import { Component, OnInit, Input } from '@angular/core';
import { Pic } from '../pic/pic.model';
import { Pics } from '../pic/pics.model';
import { WordService } from '../shared/word.service';
import { ActionService } from '../actions/action.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word: Pics;

  letters = [];
  letterIndexInSet: number;

  constructor(private wordService: WordService,
              private actionService: ActionService) { }

  ngOnInit() {

    this.letters.length = this.wordService.currentWord.length;
    
    this.wordService.selectedWordEmpty.subscribe(() => {
      this.letters.length = this.wordService.currentWord.length;
    });

    this.wordService.letterSelected.subscribe(() => {
      this.wordService.selectedWord.forEach((letter, i) => {
        this.letters[i] = letter; 
      });
    });

    this.wordService.letterRemoved.subscribe(() => {
      this.letters = this.wordService.selectedWord;
    });

    this.wordService.currentWordChanged.subscribe(() => {
      this.letters.length = this.wordService.currentWord.length;
    });

    this.actionService.allRevealed.subscribe((value) => {
      this.letters.forEach((letter, i) => {
        console.log(letter);
        if (value === "all") {
          letter = [];
        }
        
      });
    });

  }

}
