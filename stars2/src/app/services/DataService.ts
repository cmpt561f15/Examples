import {Injectable} from 'angular2/core';
import {Http,HTTP_PROVIDERS, HTTP_BINDINGS } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export default class DataService {
    resourceUrls = new Map<string, string>();

    constructor(public http : Http) {
        this.resourceUrls.set('courses', './data/course.json');
        this.resourceUrls.set('programs', './data/program.json');
        this.resourceUrls.set('students', './data/student.json');
        this.resourceUrls.set('staff', './data/staff.json');
        this.resourceUrls.set('actions', './data/action.json');
        this.resourceUrls.set('actionTypes', './data/actionType.json');
        this.resourceUrls.set('adviserTypes', './data/advisertype.json');
    }

    getResource(resource) {
        let url = this.resourceUrls.get(resource);
        //alert (url);
        return this.http.get(url).map(response => response.json() );
    }
}