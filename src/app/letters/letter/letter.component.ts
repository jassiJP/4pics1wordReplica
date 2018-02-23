import { Component, OnInit, Input } from '@angular/core';
import { WordService } from '../../shared/word.service';
import { ActionService } from '../../actions/action.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css']
})
export class LetterComponent implements OnInit {
  @Input() letter;
  @Input() letterIndex: number;

  allDisable: boolean;

  constructor(private wordService: WordService,
              private actionService: ActionService) { }

  ngOnInit() {
    this.allDisable = false;
    this.wordService.allLettersFilled.subscribe((value) => {
      value ? this.allDisable = true: this.allDisable = false;
    });
    this.wordService.letterRemoved.subscribe(() => {
      this.allDisable = false;
    });
    this.actionService.allRevealed.subscribe((value) => {
      if (value === "all") {
        this.allDisable = true;
      }
    });

  }

  onSelect() {
    this.wordService.selectLetter(this.letter, this.letterIndex);
  }

}
