import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, RouteData,
    LocationStrategy, HashLocationStrategy,Router} from 'angular2/router';
import StarsService from '../services/stars-service';
import {actionFormComponent} from "./actionForm";
import Utils from '../services/Utils';
@Component({
    selector: 'Actions',
    templateUrl: './app/components/actions.html',
    directives: [CORE_DIRECTIVES,ROUTER_DIRECTIVES,actionFormComponent]
})

export class ActionsComponent {
    isAdviser : boolean;
    isFaculty : boolean;
    filteredActions; currentStudentId; selectedStudent;
    selectedActionBy; deletActionId; editActionMode;

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

    constructor(public starsService: StarsService, public router:Router, public params:RouteParams ){
        this.isAdviser = (this.starsService.currentUser.Type === 'Adviser');
        this.isFaculty = (this.starsService.currentUser.Type === "Faculty");

        this.currentStudentId = parseInt(params.get('id'));
        this.filteredActions= this.starsService.actions.filter(a
            => a.Students.indexOf( this.currentStudentId) >= 0);
        this.selectedStudent= this.currentStudentId;
        this.selectedActionBy= 'me';
        this.filterActionsBy('me');


    }

    onLogout (){
        localStorage.clear()
    }

    filterActionsBy(actionBy){
        this.filteredActions= this.starsService.actions.filter(a
            => a.Students.indexOf( this.currentStudentId) >= 0);
        switch (actionBy) {
            case 'me':
                this.filteredActions = this.filteredActions.filter(a =>
                a.ByWhom === this.starsService.currentUser.Username);
                break;
            case 'adviser':
                this.filteredActions = this.filteredActions.filter(a
                    => this.starsService.advisors.indexOf(a.ByWhom) >= 0);
                break;
            case 'coordinator':
                this.filteredActions = this.filteredActions.filter(a
                    => this.starsService.coordinators.indexOf(a.ByWhom) >= 0);
                break;
            case 'faculty':
                this.filteredActions = this.filteredActions.filter(a
                    => this.starsService.coordinators.indexOf(a.ByWhom) < 0 && this.starsService.advisors.indexOf(a.ByWhom) < 0);
                break;
        }
    }

    selectStudent (studentId){
        this.currentStudentId=parseInt(studentId);
        this.selectedActionBy= 'me';
        this.filterActionsBy('me');

    }

    nextStudent(studentId){
        let nextStuentIndex = (this.starsService.students.map(s => parseInt(s.StudentId) ).indexOf(parseInt(studentId))) + 1;
        if (nextStuentIndex >= this.starsService.students.length){
            return
        }else {

            let nextStudetnId= this.starsService.students[nextStuentIndex].StudentId;
            this.currentStudentId=nextStudetnId;
            this.selectedStudent=nextStudetnId;
            this.selectStudent(nextStudetnId);
        }
    }

    prevStudent(studentId){
        let prevStuentIndex = (this.starsService.students.map(s => parseInt(s.StudentId) ).indexOf(parseInt(studentId))) - 1;
        if (prevStuentIndex < 0){
            return
        }else {

            let prevStudetnId= this.starsService.students[prevStuentIndex].StudentId;
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
        //ToDo: improve delete actions
        this.filteredActions = this.filteredActions.filter(a => a.ActionId != this.deletActionId);
        this.starsService.deleteAction(this.deletActionId);
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
                tempAction= this.starsService.actions.filter(a => a.ActionId == parseInt(actionId))[0];
                this.editedAction= tempAction;
                this.editedActionDate= Utils.toDate(tempAction.Date);
                console.log(this.editedActionDate);
                break;
            case "Add":
                //ToDo: improve this and simplify it
                let ids = this.starsService.actions.map(a => a.ActionId);
                let nextId= Math.max(...ids) + 1;
                let courseCRN= '';
                if (this.isFaculty){
                    let studentCourses =this.starsService.students.filter(s => this.selectedStudent == s.StudentId )
                        .map(s => s.Courses);
                    let instructorCourses= this.starsService.instructorCourses; //this.courses.filter(c => c.InstructorId == this.starsService.currentUser.StaffNo).map(c => c.CRN);
                    studentCourses[0].forEach(c => {
                       if (instructorCourses.indexOf(parseInt(c))>= 0){
                           courseCRN= c;
                       }
                    });
                    //courseCRN= students[indexOf(this.selectedStudent)].courseCRN;
                }
                this.editedAction= editedAction= {
                    "ActionId": nextId,
                    "Date": Utils.formatDate(Utils.getTodayDate()),
                    "ActionType": '',
                    "Title": '',
                    "Description": '',
                    "ByWhom": this.starsService.currentUser.Firstname,
                    "CourseCRN": courseCRN,
                    "Students": this.selectedStudent
                };
                this.editedActionDate= Utils.getTodayDate();
                //console.log(this.editedAction);
                break;
        }
    }


    onCloseForm(){
        this.openForm= false
    }

    onSubmitForm(event){
        this.openForm= false;
        console.log(event);
        if (event != "null"){
            this.starsService.actions.push((event));
            this.filteredActions.push((event));
        }
        localStorage.setItem('actions', JSON.stringify(this.starsService.actions));
    }
    
    onTest(){

        //alert("hello");
        //this.router.navigate(['/Login']);
        this.router.navigateByUrl('/(deleteAction)');
    }

}