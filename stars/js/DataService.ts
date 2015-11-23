export default class DataService {
    resourceUrls = new Map<string, string>();

    constructor() {
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
        return new Promise((resolve, reject) => {
            $.get(url).then(resolve, reject);
        });
    }
}