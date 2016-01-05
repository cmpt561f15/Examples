import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, Router} from 'angular2/router';
import StarsService from '../services/stars-service';
import {ActionEditor} from "./ActionEditor";
import {ActionViewer} from "./ActionViewer";

@Component({
    selector: 'actions',
    templateUrl: './app/components/actions.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ActionEditor, ActionViewer]
})

export class ActionsList {
    selectedStudentId:string;
    selectedActionBy:string;

    constructor(public starsService:StarsService, public router:Router, public params:RouteParams) {
        if (typeof starsService.currentUser === 'undefined') {
            router.navigate(['/Login']);
        }

        this.selectedStudentId = params.get('id');
        this.selectedActionBy = 'Me';
        this.onParamChanged(this.selectedStudentId, this.selectedActionBy);
    }

    onParamChanged(studentId, actionBy) {
        studentId = parseInt(studentId);
        this.starsService.getActions(studentId, actionBy);
    }

    onChangeStudent(direction) {
        let i = 0;
        for (i; i < this.starsService.students.length; i++) {
            if (this.starsService.students[i].StudentId == this.selectedStudentId) {
                break;
            }
        }
        if (direction == "next" && i < this.starsService.students.length - 1) {
            this.selectedStudentId = this.starsService.students[i + 1].StudentId;
        } else if (direction == "previous" && i > 0) {
            this.selectedStudentId = this.starsService.students[i - 1].StudentId;
        }

        this.onParamChanged(this.selectedStudentId, this.selectedActionBy);
    }

    onDelete(actionId : string) {
        if (confirm("Confirm delete?")) {
            this.starsService.deleteAction(actionId);
        }
        return false;
    }
}