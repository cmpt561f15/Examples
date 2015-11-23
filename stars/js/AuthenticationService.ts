import DataService from './DataService'

export default class AuthenticationService {
    static login (username: string, password: string) {
        return new Promise((resolve, reject) => {
            let ds = new DataService();
            ds.getResource('staff').then(users => {
                users = users.filter(s => s.Username === username && s.Password === password);
                    if (users.length > 0) {
                        resolve(users[0]);
                    }
                    else {
                        reject("Invalid username and/or password");
                    }
                });
            });
    }
}