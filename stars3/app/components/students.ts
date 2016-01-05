import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteParams, Router} from 'angular2/router';
import StarsService from '../services/stars-service';
import {ActionEditor} from "./ActionEditor";

@Component({
    selector: 'Students',
    templateUrl: './app/components/students.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ActionEditor]
})

export class StudentsList {
    selectedProgram : string = 'All';
    selectedCourse : string = 'All';
    selectedStudents = [];
    filteredStudents;
    openForm:boolean = false;

    constructor(public starsService: StarsService, public router : Router) {
        if (typeof starsService.currentUser === 'undefined') {
            router.navigate(['/Login']);
        }
        this.filteredStudents = starsService.students;
    }

    onParamChanged(selectedProgram, selectedCourse) {
        if (selectedProgram == 'All' && selectedCourse === 'All') {
            this.filteredStudents = this.starsService.students;
            //console.log("this.filteredStudents - All", this.filteredStudents);
            return false;
        }
        if (selectedProgram != 'All') {
            this.filteredStudents = this.starsService.students.filter(s => s.Program == selectedProgram);
            //console.log("this.filteredStudents - " + selectedProgram, this.filteredStudents);
            return false;
        }
        if (selectedCourse != 'All') {
            this.filteredStudents = this.starsService.students.filter(s => s.Courses.indexOf(parseInt(selectedCourse)) > -1);
            //console.log("this.filteredStudents - " + selectedCourse, this.filteredStudents);
            return false;
        }
    }

    selectCheckbox(event) {
        if (event.target.checked) {
            this.selectedStudents.push(parseInt(event.target.value))
        } else {
            this.selectedStudents = this.selectedStudents.filter(s => s != parseInt(event.target.value))
        }
        console.log(this.selectedStudents);
    }
}