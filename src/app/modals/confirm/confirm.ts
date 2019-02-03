import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utils } from '../../utils.class';

@Component({
    selector: 'app-modal-confirm',
    templateUrl: './confirm.html',
    styleUrls: ['./confirm.scss']
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
    public question;

    constructor(
        public modal: NgbActiveModal
    ) {}

    public close() {
        this.modal.close('close');
    }

    cancel() {
        this.modal.close('cansel');
    }

    confirm() {
        this.modal.close('yes');
    }

    async ngOnInit() {
    }

    async ngOnDestroy() {
    }
}
