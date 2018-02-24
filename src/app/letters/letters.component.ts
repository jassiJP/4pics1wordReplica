import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '../shared/word.service';
import { Pic } from '../pic/pic.model';
import { Pics } from '../pic/pics.model';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent implements OnInit {
  @Input() word: Pics;

  letterSet = [];

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.letterSet = this.wordService.getLetterSet( this.wordService.currentWord );

    this.wordService.letterSelected.subscribe(() => {
      this.letterSet = this.wordService.letterSet;
    });

    this.wordService.letterRemoved.subscribe(() => {
      this.letterSet = this.wordService.letterSet;
    });

    this.wordService.currentWordChanged.subscribe(() => {
      this.letterSet = this.wordService.getLetterSet( this.wordService.currentWord );
    });
  }

}
