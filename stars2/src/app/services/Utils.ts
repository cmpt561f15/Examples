
export default class Utils {
    static redirect(url:string) {
        //let url = this.getBaseUrl() + '/' + url;
        location.href= url
    }

    static getBaseUrl() {
        let baseUrl = window.location.origin;
        //let pathArray = window.location.pathname.split( '/' );
        //console.log(pathArray);
        baseUrl = baseUrl + '/' + window.location.pathname.split('/')[1];
        return baseUrl;
    }

    static setUserInfo(currentUser) {
        $('#userFullname').text(`${currentUser.Firstname} ${currentUser.Lastname}`);
    }

    static logout() {
        localStorage.clear();
        this.redirect('login.html');
    }

    static getQueryStringValue(param) {
        let sPageURL = window.location.search.substring(1);
        let queryStringVars = sPageURL.split('&');
        for (let i = 0; i < queryStringVars.length; i++) {
            var paramName = queryStringVars[i].split('=');
            if (paramName[0] == param) {
                return paramName[1];
            }
        }
    }

    static setTodayDate() {
        let date = new Date;
        return`${date.getFullYear()}-${date.getDate()}-${date.getMonth()+1}`;
    }

    static toDate(strDate) {
        var dateParts = strDate.split("/");
        console.log("dateParts: ", dateParts);
        if (parseInt(dateParts[0]) < 10){
            return `${dateParts[2]}-${dateParts[1]}-0${dateParts[0]}`;
        }else {
            return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        }

    }

    static formatDate(date) {
        var dateParts = date.split("-");
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
}