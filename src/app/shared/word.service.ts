import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { PointsService } from './points.service';
import { DataService } from './data.service';
import { Pics } from '../pic/pics.model';
import { Pic } from '../pic/pic.model';

@Injectable()
export class WordService {
    letterSet = [];
    currentWord: string;
    selectedWord = [];
    currentPic: Pics;
    currentDifficulty = 0;
    currentWordIndex = 0; //this is the index within respective elements in DataService picsData
    
    difficultyChanged = new Subject<number>();
    letterSelected = new Subject<string>();
    letterRemoved = new Subject();
    currentWordChanged = new Subject<number>();
    allLettersFilled = new Subject();
    selectedWordEmpty = new Subject();
    wordMatch = new Subject();

    constructor(private pointService: PointsService,
                private dataService: DataService) {}

    makeLetterSet() {
        const word = this.currentWord;
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let letterSet = '';
        let tempLetterSet = [];

        for (var i = 0; i < 12 - word.length; i++){
            letterSet += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        letterSet += word;

        tempLetterSet = letterSet.split('');

        for(var i = tempLetterSet.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = tempLetterSet[i];
            tempLetterSet[i] = tempLetterSet[j];
            tempLetterSet[j] = tmp;
        }

        this.letterSet = tempLetterSet;
        return this.letterSet;
    }

    getLetterSet(word) {
        this.currentWord = word;
        for(let i=0;i<this.currentWord.length;i++) {
            this.selectedWord[i] = [];
        }
        
        const letterSet = this.makeLetterSet();
        return letterSet;
    }

    //this letterIndex if of letterSet
    selectLetter(letter, letterIndex) {
        
        for(let i=0; i<this.selectedWord.length;i++) {
            if(this.selectedWord[i].length === 0) {
                this.selectedWord[i] = [letter, letterIndex];
                break;
            }
        }
        
        this.letterSet[letterIndex] = null;
        this.letterSelected.next(letter);
        this.checkWordLength();
        this.checkWordMatch();
    }

    removeLetter(letter, index) {
        this.selectedWord[index] = [];
    
        this.letterSet[letter[1]] = letter[0];
        this.letterRemoved.next();
        this.checkWordLength();
    }

    checkWordLength() {
        let empty = false;

        for (let letter of this.selectedWord) {
            if (letter.length === 0) {
                empty = true;
            } else {
                empty = false;
                break;
            }
        }

        if (empty) {
            for(let letter of this.selectedWord){
                letter = [];
            }
            this.selectedWordEmpty.next();
        }

        let full = false;
        for (let i=0; i<this.selectedWord.length;i++) {
            if (this.selectedWord[i].length !== 0) {
                full = true;
            } else {
                full = false;
                break;
            }
        }
        if (full) {
            this.allLettersFilled.next(true);
        } else {
            this.allLettersFilled.next(false);
        }
    }

    checkWordMatch() {
        
        let theWord = ''
        this.selectedWord.forEach((letter) => {
            theWord += letter[0];
        });
        console.log('theWord: ', theWord, this.currentWord);

        let marked = false;

        this.dataService.picsData.forEach((pics, i) => {
            if(pics.difficulty === this.currentDifficulty) {
                if(this.dataService.picsData[i].pics[this.currentWordIndex].answered) {
                    console.log("WWAWA: ", this.dataService.picsData[i].pics[this.currentWordIndex]);
                }
            }
        })

        for(let i=0; i<this.dataService.picsData.length; i++) {
            if (this.dataService.picsData[i].difficulty === this.currentDifficulty){
                for(let j=0; j<this.dataService.picsData[i].pics.length;j++) {
                    if (this.dataService.picsData[i].pics[j].answered && j===this.currentWordIndex ) {
                        marked = true;
                        break;
                    }
                }
                break;
            }
            
        }

            console.log("MARKED:   ", marked);

        if (theWord === this.currentWord && marked===false) {
            this.allLettersFilled.next(true);
            this.pointService.addPoints(this.currentDifficulty);
            this.markAnswered(this.currentDifficulty, this.currentWordIndex);
            this.wordMatch.next();
        }
    }

    setDifficulty() {
        console.log("Difficulty: ", this.currentDifficulty);
        this.currentDifficulty += 1;
        console.log("CHANGE Difficulty: ", this.currentDifficulty);
        this.setupNewLetters();
        this.setCurrentWord();
        this.difficultyChanged.next(this.currentDifficulty);
    }

    //finds and sets up next unanswered pic in pics array of current difficulty
    setCurrentWord() {
        let nextPic: Pics;
        let allUnAnswered = [];
        for(let i=0; i<this.dataService.picsData.length;i++) {
            console.log(this.dataService.picsData[i]);
            if (this.dataService.picsData[i].difficulty === this.currentDifficulty) {
                for(let j=0; j< this.dataService.picsData[i].pics.length; j++) {
                    console.log(this.dataService.picsData[i].pics[j]);
                    allUnAnswered = this.dataService.picsData[i].pics.filter((pic) => pic.answered === false);
                    if (allUnAnswered.length > 0 && this.dataService.picsData[i].pics[j].answered === false) {
                        this.currentWordIndex = j;
                        nextPic = this.dataService.picsData[i].pics[j];
                        this.currentWord = nextPic.word;
                        this.currentPic = nextPic;
                        this.setupNewLetters();
                        this.currentWordChanged.next();
                        break;
                    } else if (allUnAnswered.length ===0) {
                        this.setDifficulty();
                        break;
                    }
                }
                break;
            }
        }
    }

    markAnswered(difficulty, currentPicIndex) {
        this.dataService.picsData.filter((pics) => {
            if (pics.difficulty === difficulty) {
                pics.pics[currentPicIndex].answered = true;
            }
        });
    }

    setupNewLetters() {
        this.selectedWord = [];
        this.letterSet = [];
        this.allLettersFilled.next(false);
        this.selectedWordEmpty.next(false);
    }

}