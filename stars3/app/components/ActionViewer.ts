import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Action} from "../models/action";

@Component({
    selector: 'action-viewer',
    templateUrl: './app/components/actionViewer.html',
    directives:[CORE_DIRECTIVES]
})
export class ActionViewer {
    action:Action;

    show(action) {
        console.log("ActionViewer", action);
        this.action = action;
    }
}
