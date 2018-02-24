import { Injectable } from '@angular/core';
import { PointsService } from '../shared/points.service';
import { WordService } from '../shared/word.service';
import { ModalService } from '../shared/modal.service';
import { Subject } from 'rxjs/Subject';
@Injectable()

export class ActionService {
    actions = [
        {
            action: 'hint',
            options: [
                {
                    name: '1-reveal',
                    taken: false,
                    points: 4
                },
                {
                    name: '4-remove',
                    taken: false,
                    points: 4
                }
            ]
        },
        {
            action: 'reveal',
            options: [ 
                {   
                    name: 'reveal-all',
                    taken: false,
                    points: 10
                }
            ]
        }
    ];

    constructor(private pointService: PointsService,
                private wordService: WordService,
                private modalService: ModalService) {}

    allRevealed = new Subject();

    getActions() {
        return this.actions;
    }

    getActionPoints(tmpaction, name: string) {
        let points: number = 0;
        this.actions.filter((action) => {
            if(action.action === tmpaction) {
                action.options.forEach((option) => {
                    if (option.name === name) {
                        points = option.points;
                    }
                }); 
            }
        });
        return points;
    }

    setActionTaken(tempaction, name) {
        this.actions.filter((action) => {
            if (action.action === tempaction){
                action.options.forEach((option) => {
                    if (option.name === name) {
                        option.taken = true;
                    }
                }); 
            }
        });
        this.pointService.pointsUpdated.next();
    }

    resetActionTaken() {
        this.actions.filter((action) => {
            action.options.forEach((option) => {
                option.taken = false;
            });
        });
    }

    isActionAvailable(tempaction, name) {
        let avail: boolean = false;
        let message: string = '';

        this.actions.forEach((action, i) => {
            if(action.action === tempaction) {
                action.options.forEach((option, j) => {
                    if (option.name === name && !option.taken) {
                        option.taken ? avail = false : avail = true;
                        message = '';
                    } else if (option.taken) {
                        avail = false;
                        message = 'Action Already Taken!';
                    }
                }); 
            }
        });
        if (!avail && name === '1-reveal' && tempaction === 'hint') {
            return false
        } else {
            return [avail, message];
        }
        
    }

    checkActionAvailable(tempaction, name) {
        const optionPoints = this.getActionPoints(tempaction, name);
        const avail = this.isActionAvailable(tempaction, name);
        if (!avail) {
            return false
        } else {
            if (optionPoints > this.pointService.currentPoints && avail[0]) {
                return [false, 'Not Enough Points']
            }
        }

        return avail;
    }

    applyAction(action:string, name: string) {
        const avail = this.checkActionAvailable(action, name);
        if (!avail) {
            this.applyAction('hint', '4-remove');
        } else {
            if (avail[0]) {
                this.modalService.openModal.next({modalName:'warningModal', action, name, message: avail[1]});
            } else {
                this.modalService.openModal.next({modalName:'warningModal', action, name, message: avail[1]});
            }
        }
        
    }

    actionRevealAll() {
        const currentWord = this.wordService.currentWord;
        const letterSet = this.wordService.letterSet;
        const points = this.getActionPoints('reveal', 'reveal-all');
        let letters = [];

        currentWord.split('').forEach((wLetter, i) => {
            const lSetIndex = letterSet.indexOf(wLetter);
            if (lSetIndex > -1 ) {
                letters.push([wLetter, lSetIndex]);
            }
        });

        this.wordService.selectedWord = letters;
        this.wordService.letterSelected.next();
        this.pointService.currentPoints -= points;
        this.setActionTaken('reveal', 'reveal-all');
        this.allRevealed.next('all');
    }

    actionReveal1() {
        const currentWord = this.wordService.currentWord;
        let letterSet = this.wordService.letterSet;
        const points = this.getActionPoints('hint', '1-reveal');
        let letters = [];
        currentWord.split('').forEach((wLetter, i) => {
            if (i === 0) {
                const lSetIndex = letterSet.indexOf(wLetter);
                if (lSetIndex > -1) {
                    letters[i] = [wLetter, lSetIndex];
                } 
                letterSet[lSetIndex] = '';
            } else {
                letters[i] = [];
            }
           
        });

        this.wordService.selectedWord = letters;
        this.wordService.letterSelected.next();
        this.pointService.currentPoints -= points;
        this.setActionTaken('hint', '1-reveal');
        this.allRevealed.next('one');
    }

    actionRemove4() {
        let letterSet = this.wordService.letterSet;
        const currentWord = this.wordService.currentWord.split('');
        const points = this.getActionPoints('hint', '1-reveal');

        let randomNumbers: number[] = [];

        randomNumbers.length = 4;

        for(let i=0; i<randomNumbers.length;) {
            const num = Math.floor(Math.random() * 11) + 1 ;
            if (randomNumbers.indexOf(num) === -1){
                randomNumbers[i] = num;
                i++;
            }
        }
        for(let i=0; i<randomNumbers.length;) {
            if (currentWord.indexOf(letterSet[randomNumbers[i]]) === -1){
                letterSet[randomNumbers[i]] = '';
            }
            i++;
        }
        
        this.wordService.letterSelected.next();
        this.pointService.currentPoints -= points;
        this.setActionTaken('hint', '4-remove');
    }

}

