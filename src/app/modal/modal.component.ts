import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalService } from '../shared/modal.service';
import { WordService } from '../shared/word.service';
import { ActionService } from '../actions/action.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService,
              private wordService: WordService,
              private actionService: ActionService) { }
  modalData;

  @ViewChild('statusModal') statusModal: ModalDirective;
  @ViewChild('diffModal') diffModal: ModalDirective;
  @ViewChild('warningModal') warningModal: ModalDirective;
   @ViewChild('gameOver') gameOver: ModalDirective;

  isModalShown: boolean = false;
  isNoPointsShown: boolean = false;
  isDiffModalShown: boolean = false;
  isWarningModalShown: boolean = false;
  isGameOverShown: boolean = false;

  whichModal;

  actionArgs:{modalName: string, action: string, name: string, message: string} = {
    modalName: '',
    action: '',
    name: '',
    message: ''
  };

  showModal(): void {
    if (this.whichModal === 'difficultyIncreased') {
      this.isDiffModalShown = true;
    } else if (this.whichModal === 'wordMatched'){
      this.isModalShown = true;
    } else if (this.whichModal === 'warningModal') {
      this.isWarningModalShown = true;
    }else if (this.whichModal === 'gameOver') {
      this.isGameOverShown = true;
    }
  }
 
  hideModal(): void {
    
    if (this.whichModal === 'difficultyIncreased') {
      this.isModalShown = false;
      this.diffModal.hide();
    } else if (this.whichModal === 'wordMatched') {
      this.statusModal.hide();
      this.isModalShown = false;
    } else if (this.whichModal === 'warningModal') {
      this.warningModal.hide();
    }
  }
 
  onHidden(whichmodal): void {
    if (whichmodal === 'diffModal') {
      this.isModalShown = false;
      this.isDiffModalShown = false;
    } else if (whichmodal === 'wordMatched') {
      this.isModalShown = false;
    } else if (this.whichModal === 'warningModal') {
      this.isWarningModalShown = false;
    }
  }

  ngOnInit() {
    this.modalService.openModal.subscribe((args:{modalName: string, action:string, name:string, message:string}) => {
      
      this.whichModal = args.modalName;
      
      if (args.action && args.name && !args.message) {
        this.actionArgs['action'] = args.action;
        this.actionArgs['name'] = args.name;
      } else {
        this.actionArgs.message = args.message;
      }
      if (this.whichModal === 'wordMatched') {
        this.modalData = this.modalService.modalData;
      }
      
      this.showModal();
    });
  } 

  onNextPic() {
    this.wordService.setCurrentWord();
    this.hideModal();
  }

  onContinue(action: string, name: string) {
    this.hideModal();
    if (action === 'hint' && name === '1-reveal') {
      this.actionService.actionReveal1();
    }
    if (action === 'reveal' && name === 'reveal-all') {
      this.actionService.actionRevealAll();
    }
    if(action === 'hint' && name === '4-remove') {
      this.actionService.actionRemove4();
    }
  }

}
