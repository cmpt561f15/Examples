export default class Utils {
    static getTodayDate() {
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