import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import StarsService from "../services/stars-service";
import {Action} from "../models/action";

@Component({
    selector: 'action-editor',
    templateUrl: './app/components/actionEdictor.html',

    directives: [CORE_DIRECTIVES]
})

export class ActionEditor {
    action : Action;
    constructor(public starsService: StarsService) {
    }

    edit(action) {
        console.log("ActionEditor", action);
        this.action = action;
    }

    add(students) {
        let byWhom : string = this.starsService.currentUser.Username;
        this.action = new Action(0, this.getTodayDate(), '', '', '', byWhom, undefined, students);
        console.log("ActionEditor.add.action",  this.action);
    }

    onFormSubmit() {
        if (this.action.ActionId === 0) {
            this.starsService.addAction(this.action);
        }
        console.log("ActionEditor.action", this.action);
    }

    private getTodayDate() {
        let date = new Date;
        return`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }
}