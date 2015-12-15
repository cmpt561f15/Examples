import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';
import AuthenticationService from '../services/AuthenticationService';
import DataService from "../services/DataService";
import StarsService from '../services/StarsService';
import {actionFormComponent} from "./actionForm";
import Utils from '../services/Utils';
@Component({
    selector: 'Actions',
    templateUrl: './app/components/actions.html',

    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES,actionFormComponent]
})

export class ActionsComponent {
    currentUser = JSON.parse(localStorage.currentUser);
    isAdviser : boolean = (this.currentUser.Type === 'Adviser');
    isFaculty : boolean =(this.currentUser.Type === "Faculty") ;
    students = JSON.parse(localStorage.students);
    actions = JSON.parse(localStorage.actions);
    coordinators = JSON.parse(localStorage.coordinators);
    advisors = JSON.parse(localStorage.advisors);
    filteredActions; currentStudentId; selectedStudent;
    selectedActionBy;deletActionId; editActionMode;

    DeleteActionCofirm: boolean = false;
    editedAction= {
        "ActionId": '',
        "Date": '',
        "ActionType": '',
        "Title": '',
        "Description": '',
        "ByWhom": '',
        "CourseCRN": '',
        "Students": ''
    };
    editedActionDate;
    mode;
    openForm : boolean = false;

    constructor(public router:Router, public params:RouteParams ){
        if (this.isAdviser){
            this.programs = JSON.parse(localStorage.programs);
        }else if (this.isFaculty){
            this.courses = JSON.parse(localStorage.courses);
        }
        this.currentStudentId = parseInt(params.get('id'));
        this.filteredActions= this.actions.filter(a
            => a.Students.indexOf( this.currentStudentId) >= 0);
        this.selectedStudent= this.currentStudentId;
        this.selectedActionBy= 'me';
        this.filterActionsBy('me');


    }

    onLogout (){
        localStorage.clear()
    }

    filterActionsBy(actionBy){
        this.filteredActions= this.actions.filter(a
            => a.Students.indexOf( this.currentStudentId) >= 0);
        switch (actionBy) {
            case 'me':
                this.filteredActions = this.filteredActions.filter(a =>
                a.ByWhom === this.currentUser.Username);
                break;
            case 'adviser':
                this.filteredActions = this.filteredActions.filter(a
                    => this.advisors.indexOf(a.ByWhom) >= 0);
                break;
            case 'coordinator':
                this.filteredActions = this.filteredActions.filter(a
                    => this.coordinators.indexOf(a.ByWhom) >= 0);
                break;
            case 'faculty':
                this.filteredActions = this.filteredActions.filter(a
                    => this.coordinators.indexOf(a.ByWhom) < 0 && this.advisors.indexOf(a.ByWhom) < 0);
                break;
        }

    }

    selectStudent (studentId){
        this.currentStudentId=parseInt(studentId);
        this.selectedActionBy= 'me';
        this.filterActionsBy('me');

    }

    nextStudent(studentId){
        let nextStuentIndex = (this.students.map(s => parseInt(s.StudentId) ).indexOf(parseInt(studentId))) + 1;
        if (nextStuentIndex >= this.students.length){
            return
        }else {

            let nextStudetnId= this.students[nextStuentIndex].StudentId;
            this.currentStudentId=nextStudetnId;
            this.selectedStudent=nextStudetnId;
            this.selectStudent(nextStudetnId);


        }


    }

    prevStudent(studentId){
        let prevStuentIndex = (this.students.map(s => parseInt(s.StudentId) ).indexOf(parseInt(studentId))) - 1;
        if (prevStuentIndex < 0){
            return
        }else {

            let prevStudetnId= this.students[prevStuentIndex].StudentId;
            this.currentStudentId=prevStudetnId;
            this.selectedStudent=prevStudetnId;
            this.selectStudent(prevStudetnId);


        }


    }

    showConfirm (actionId,event){
        event.preventDefault();
        this.deletActionId= actionId;
        this.DeleteActionCofirm = true;

        //this.router.navigateByUrl(`/actions/${this.currentStudentId}(deleteAction)`);
        //console.log(actionId);

    }

    onCofirm (){
        this.filteredActions = this.filteredActions.filter(a => a.ActionId != this.deletActionId);
        this.actions = this.actions.filter(a => a.ActionId != this.deletActionId);
        localStorage.setItem('actions', JSON.stringify(this.actions));
        this.onClose();

    }

    onClose(){
        this.DeleteActionCofirm = false;

    }

    actionEditor(actionId,event,mode){
        this.openForm= true;
        let tempAction;
        this.editActionMode= mode;
        switch (mode){

            case "Edit":
                event.preventDefault();
                tempAction= this.actions.filter(a => a.ActionId == parseInt(actionId))[0];
                this.editedAction= tempAction;
                this.editedActionDate= Utils.toDate(tempAction.Date);
                console.log(this.editedActionDate);
                break;
            case "Add":
                let ids = this.actions.map(a => a.ActionId);
                let nextId= Math.max(...ids) + 1;
                let courseCRN= '';
                if (this.isFaculty){
                    let studentCourses =this.students.filter(s => this.selectedStudent == s.StudentId )
                        .map(s => s.Courses);
                    let instructorCourses= this.courses.filter(c => c.InstructorId == this.currentUser.StaffNo).map(c => c.CRN);
                    studentCourses[0].forEach(c => {

                       if (instructorCourses.indexOf(parseInt(c))>= 0){

                           courseCRN= c;
                       }
                    });
                    //courseCRN= students[indexOf(this.selectedStudent)].courseCRN;
                }
                this.editedAction= editedAction= {
                    "ActionId": nextId,
                    "Date": Utils.formatDate(Utils.setTodayDate()),
                    "ActionType": '',
                    "Title": '',
                    "Description": '',
                    "ByWhom": this.currentUser.Firstname,
                    "CourseCRN": courseCRN,
                    "Students": this.selectedStudent
                };
                this.editedActionDate= Utils.setTodayDate();
                //console.log(this.editedAction);
                break;
        }
        //console.log(this.editedAction);
       // console.log(mode)


    }


    onCloseForm(){

        this.openForm= false


    }

    onSubmitForm(event){
        this.openForm= false;
        console.log(event);
        if (event != "null"){
            this.actions.push((event));
            this.filteredActions.push((event));
        }

        localStorage.setItem('actions', JSON.stringify(this.actions));
    }
    onTest(){

        //alert("hello");
        //this.router.navigate(['/Login']);
        this.router.navigateByUrl('/(deleteAction)');
    }

}