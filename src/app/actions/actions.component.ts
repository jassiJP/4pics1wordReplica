import { Component, OnInit } from '@angular/core';
import { ActionService } from './action.service';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(private actionService: ActionService,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  onRevealAll() {
    this.actionService.applyAction('reveal', 'reveal-all');
  }

  onHint() {
    this.actionService.applyAction('hint', '1-reveal');
  }

}
