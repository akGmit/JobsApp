import { Address } from '../models/address';
//User class
export class User {
    username: String;
    password: String;
    firstname: String;
    lastname: String;
    _id: String;
    tel: String;
    email: String;
    address : Address;
    bio: String;
    experience: String;

    //Set username, password, firstname, lastname and id
    setUser(user){
        this.username = user.username;
        this.password = user.password;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this._id = user._id;
    }
    ///Set users application data
    setUserAppData(appData){
        this.tel = appData.tel;
        this.email = appData.email;
        this.address = appData.address;
        this.experience = appData.experience;
        this.bio = appData.bio;
    }
    //Rturn this user
    getUser(): any{
        return this;
    }
}
