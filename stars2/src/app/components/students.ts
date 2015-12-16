import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import StarsService from '../services/stars-service';
import {actionFormComponent} from "./actionForm";
import Utils from "../services/Utils";

@Component({
    selector: 'Students',
    templateUrl: './app/components/students.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, actionFormComponent]
})
export class StudentsComponent {
    filteredStudents;
    checkedStudents = [];
    isAdviser : boolean;
    isFaculty : boolean;
    openForm:boolean = false;
    editActionMode;
    editedActionDate;
    editedAction = {
        "ActionId": '',
        "Date": '',
        "ActionType": '',
        "Title": '',
        "Description": '',
        "ByWhom": '',
        "CourseCRN": '',
        "Students": ''
    };

    constructor(public starsService: StarsService, public router : Router) {
        this.isAdviser = (this.starsService.currentUser.Type === 'Adviser');
        this.isFaculty = (this.starsService.currentUser.Type === "Faculty");
        this.filteredStudents = starsService.students;
    }

    onLogout() {
        localStorage.clear();
    }

    filterByProgram(programDD) {
        if (programDD == "ALL") {
            this.filteredStudents = this.starsService.students;
        } else {
            this.filteredStudents = this.starsService.students.filter(s => s.Program == programDD);
        }

    }

    filterByCourse(courseDD) {
        if (courseDD == "ALL") {
            this.filteredStudents = this.starsService.students;
        } else {
            this.filteredStudents = this.starsService.students.filter(s => s.Courses.indexOf(parseInt(courseDD)) >= 0);
        }
    }

    selectCheckbox(event) {
        if (event.target.checked) {
            this.checkedStudents.push(parseInt(event.target.value))

        } else {
            this.checkedStudents = this.checkedStudents.filter(s => s != parseInt(event.target.value))
        }

        console.log(this.checkedStudents);
    }


    actionEditor() {
        if (this.checkedStudents.length == 0) {
            alert("Please select student first");
            return false;
        }
        this.openForm = true;
        let tempAction;
        this.editActionMode = 'Add';

        let ids = this.starsService.actions.map(a => a.ActionId);
        let nextId = Math.max(...ids) + 1;
        let courseCRN = '';
        if (this.isFaculty) {
            let studentCourses = this.starsService.students.filter(s => (this.checkedStudents.indexOf(s.StudentId)))
                .map(s => s.Courses);
            courseCRN = studentCourses[0][0];
            console.log(courseCRN);

            //courseCRN= students[indexOf(this.selectedStudent)].courseCRN;
        }
        this.editedAction = {
            "ActionId": nextId,
            "Date": Utils.formatDate(Utils.getTodayDate()),
            "ActionType": '',
            "Title": '',
            "Description": '',
            "ByWhom": this.starsService.currentUser.Firstname,
            "CourseCRN": courseCRN,
            "Students": this.checkedStudents
        };
        this.editedActionDate = Utils.getTodayDate();
    }

    onCloseForm() {
        this.openForm = false
    }

    onSubmitForm(event) {
        this.openForm = false;
        console.log(event);
        if (event != "null") {
            this.starsService.actions.push((event));
        }

        localStorage.setItem('actions', JSON.stringify(this.starsService.actions));
    }
}