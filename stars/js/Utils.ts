export default class Utils {
    static redirect(url : string) {
        let url = this.getBaseUrl() + '/' + url;
        $(location).attr('href', url);
    }

    static getBaseUrl() {
        let baseUrl = window.location.origin;
        //let pathArray = window.location.pathname.split( '/' );
        //console.log(pathArray);
        baseUrl = baseUrl + '/' + window.location.pathname.split( '/' )[1];
        return baseUrl;
    }

    static setUserInfo(currentUser) {
        $('#userFullname').text(`${currentUser.Firstname} ${currentUser.Lastname}`);
    }

    static logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('courses');
        localStorage.removeItem('programs');
        localStorage.removeItem('students');
        this.redirect('login.html');
    }
}