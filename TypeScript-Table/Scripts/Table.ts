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
        
        this.FirstName = $('#FirstName').val();
        this.LastName = $('#LastName').val();
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

        ViewModel.UserViewModel.users.push(new User(serverUser.Id, serverUser.FirstName,
            serverUser.LastName)); });
    ko.applyBindings(ViewModel);
});