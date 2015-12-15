import {Component, Input,Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import Utils from '../services/Utils';
@Component({
    selector: 'action-form',
    templateUrl: './app/components/actionForm.html',

    directives: [CORE_DIRECTIVES]
})

export class actionFormComponent {
    @Input()  mode;
    @Input()  action;
    @Input()  actiondate;
    @Output() closeform= new EventEmitter();
    @Output() submitform= new EventEmitter();
    titleerror : boolean= false;
    dateerror  : boolean= false;
    typeerror : boolean= false;
    constructor (){


    }

    closeForm(){
        this.closeform.next();

    }
    submitForm(){
        if (this.action.ActionType == ""){
            this.typeerror= true;
            return

        }else if (this.action.Title == ""){
            this.titleerror= true;
            return
        }

        if (this.mode == 'Edit'){

            if (this.action.Date == ""){
                this.dateerror= true;
                return
            }
            this.action.Date = Utils.formatDate(this.actiondate);

            this.submitform.next("null");
        }else if (this.mode == 'Add'){
            this.action.Date = Utils.formatDate(this.actiondate);
            //console.log(this.action);
            let tempstutent = [this.action.Students];
            if (typeof (this.action.Students)!= 'number'){
                tempstutent= this.action.Students;
            }

            let tempaction= {
                "ActionId":this.action.ActionId,
                "Date":this.action.Date,
                "ActionType":this.action.ActionType,
                "Title":this.action.Title,
                "Description":this.action.Description,
                "ByWhom":this.action.ByWhom.toLowerCase(),
                "CourseCRN":this.action.CourseCRN,
                "Students":tempstutent};
            this.submitform.next(tempaction);
        }
    }
}