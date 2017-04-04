///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
class User {
    Id: KnockoutObservable<number>;
    FirstName: KnockoutObservable<string>;
    LastName: KnockoutObservable<string>;
    constructor(id: number, firstName: string,lastName: string) {
        this.Id = ko.observable(id);
        this.FirstName = ko.observable(firstName);
        this.LastName = ko.observable(lastName);
    }
    addUser(): void {
        this.FirstName = $('#inpFirstName').val();
        this.LastName = $("#inpLastName").val();
        var dataObject = ko.toJSON(this);
        var ViewModel = {
            UserViewModel: new UserViewModel()
        };
        $.ajax({
            url: '/home/AddUsers',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                ViewModel.UserViewModel.users
                    .push(new User(data.Id, data.FirstName, data.LastName));
               
            }
        });
    };
    }

class UserViewModel {
    public users: KnockoutObservableArray<User>;
    constructor() {
        this.users = ko.observableArray([]);
    }
    removeUsers(user): void {
        $.ajax({
            url: '/home/DeleteUser/' + user.Id(),
            type: 'post',
            contentType: 'application/json',
            success: function () {
                this.users.remove(user);
            }
        });
    }
}
$(document).ready(function () {
    var serverData: any[];
    serverData = JSON.parse($("#serverJSON").val());
    var ViewModel = {
        UserViewModel: new UserViewModel()
    };
    
    var i: number;

    for (i = 0; i < serverData.length; i++) {
        var serverUser: any;
        serverUser = serverData[i];
        ViewModel.UserViewModel.users.push(new User(serverUser.Id, serverUser.FirstName,
            serverUser.LastName));
    }
    
    var userList: User = new User(this.Id, this.FirstName, this.LastName);
    $("#btnAddUser").click(() => {
        userList.addUser();
        this.FirstName = userList.FirstName;
        this.LastName = userList.LastName;

        ViewModel.UserViewModel.users.push(new User(this.Id, this.FirstName,
            this.LastName));
    });
    var remove: UserViewModel = new UserViewModel();
    $("#removeUser").click(() => { remove.removeUsers(this); });
    ko.applyBindings(ViewModel);
});