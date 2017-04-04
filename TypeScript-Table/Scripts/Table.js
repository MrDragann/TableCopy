///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
var User = (function () {
    function User(id, firstName, lastName) {
        this.Id = ko.observable(id);
        this.FirstName = ko.observable(firstName);
        this.LastName = ko.observable(lastName);
    }
    User.prototype.addUser = function () {
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
    ;
    return User;
}());
var UserViewModel = (function () {
    function UserViewModel() {
        this.users = ko.observableArray([]);
    }
    UserViewModel.prototype.removeUsers = function (user) {
        $.ajax({
            url: '/home/DeleteUser/' + user.Id(),
            type: 'post',
            contentType: 'application/json',
            success: function () {
                this.users.remove(user);
            }
        });
    };
    return UserViewModel;
}());
$(document).ready(function () {
    var _this = this;
    var serverData;
    serverData = JSON.parse($("#serverJSON").val());
    var ViewModel = {
        UserViewModel: new UserViewModel()
    };
    var i;
    for (i = 0; i < serverData.length; i++) {
        var serverUser;
        serverUser = serverData[i];
        ViewModel.UserViewModel.users.push(new User(serverUser.Id, serverUser.FirstName, serverUser.LastName));
    }
    var userList = new User(this.Id, this.FirstName, this.LastName);
    $("#btnAddUser").click(function () {
        userList.addUser();
    });
    var remove = new UserViewModel();
    $("#removeUser").click(function () { remove.removeUsers(_this); });
    ko.applyBindings(ViewModel);
});
