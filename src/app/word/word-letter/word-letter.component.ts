import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '../../shared/word.service';
import { ActionService } from '../../actions/action.service';

@Component({
  selector: 'app-word-letter',
  templateUrl: './word-letter.component.html',
  styleUrls: ['./word-letter.component.css']
})
export class WordLetterComponent implements OnInit {
  @Input() letter = [];
  @Input() index:number;

  selectedLetter: string;
  selectedLetterIndex: number;
  disabled: boolean;

  constructor(private wordService: WordService,
              private actionService: ActionService) { }

  ngOnInit() {
    this.disabled = false;
    if (this.letter) {
      this.selectedLetter = this.letter[0];
      this.selectedLetterIndex = this.letter[1];
    } else {
      this.selectedLetter = '';
    }

    this.wordService.currentWordChanged.subscribe(() => {
      this.selectedLetter = '';
    });

    this.actionService.allRevealed.subscribe((value) => {
      console.log("ALLDISABKED");
      if (value === "all") {
        this.disabled = true;
      }
      
      console.log(this.disabled);
    });
  }

  onRemove() {
    this.wordService.removeLetter(this.letter, this.index);
  }

}
