import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';
import AuthenticationService from '../services/AuthenticationService';
import DataService from "../services/DataService";
import StarsService from '../services/StarsService';
import {actionFormComponent} from "./actionForm";
import Utils from "../services/Utils";
@Component({
    selector: 'Students',
    templateUrl: './app/components/students.html',

    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, actionFormComponent]
})

export class StudentsComponent {
    currentUser = JSON.parse(localStorage.currentUser);
    students = JSON.parse(localStorage.students);
    actions = JSON.parse(localStorage.actions);
    filteredStudents = this.students;
    courses;
    programs;
    checkedStudents = [];
    isAdviser:boolean = (this.currentUser.Type === 'Adviser');
    isFaculty:boolean = (this.currentUser.Type === "Faculty");
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

    constructor(public router:Router) {
        if (this.currentUser.Type === 'Adviser') {
            this.programs = JSON.parse(localStorage.programs);
        } else if (this.currentUser.Type === "Faculty") {
            this.courses = JSON.parse(localStorage.courses);
        }

    }

    onLogout() {
        localStorage.clear();
    }

    filterByProgram(programDD) {
        if (programDD == "ALL") {
            this.filteredStudents = this.students;
        } else {
            this.filteredStudents = this.students.filter(s => s.Program == programDD);
        }

    }

    filterByCourse(courseDD) {
        if (courseDD == "ALL") {
            this.filteredStudents = this.students;
        } else {
            this.filteredStudents = this.students.filter(s => s.Courses.indexOf(parseInt(courseDD)) >= 0);
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

        let ids = this.actions.map(a => a.ActionId);
        let nextId = Math.max(...ids) + 1;
        let courseCRN = '';
        if (this.isFaculty) {
            let studentCourses = this.students.filter(s => (this.checkedStudents.indexOf(s.StudentId)))
                .map(s => s.Courses);
            courseCRN = studentCourses[0][0];
            console.log(courseCRN);

            //courseCRN= students[indexOf(this.selectedStudent)].courseCRN;
        }
        this.editedAction = {
            "ActionId": nextId,
            "Date": Utils.formatDate(Utils.setTodayDate()),
            "ActionType": '',
            "Title": '',
            "Description": '',
            "ByWhom": this.currentUser.Firstname,
            "CourseCRN": courseCRN,
            "Students": this.checkedStudents
        };
        this.editedActionDate = Utils.setTodayDate();
        //console.log(this.editedAction);


        //console.log(this.editedAction);
        // console.log(mode)

    }

    onCloseForm() {

        this.openForm = false


    }

    onSubmitForm(event) {
        this.openForm = false;
        console.log(event);
        if (event != "null") {
            this.actions.push((event));
        }

        localStorage.setItem('actions', JSON.stringify(this.actions));
    }
}