///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
var ViewModel = (function () {
    function ViewModel() {
        this.ItemViewModel = new ItemViewModel();
        this.UserAction = new UserAction();
        this.User = new User(null, '', '');
        ViewModel.Display = ko.observable(false);
    }
    return ViewModel;
}());
;
var UserAction = (function () {
    function UserAction() {
    }
    //Добавление пользователя
    UserAction.prototype.addUser = function (user) {
        var dataObject = ko.toJSON(user.User);
        $.ajax({
            url: '/home/AddUsers',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                console.log(dataObject);
                ItemViewModel.users.push(data);
                user.User.FirstName("");
                user.User.LastName("");
            },
            error: function () {
                console.log(dataObject);
            }
        });
    };
    ;
    //Удаление пользователя
    UserAction.prototype.removeUsers = function (user) {
        $.ajax({
            url: '/home/DeleteUser/' + user.Id,
            type: 'post',
            contentType: 'application/json',
            success: function () {
                ItemViewModel.users.remove(user);
            }
        });
    };
    //Редактирование пользователя
    UserAction.prototype.editUser = function (user) {
        user.User.Id = $("#ID").val();
        var dataObject = ko.toJSON(user);
        $.ajax({
            url: '/home/EditUser',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                user.User.FirstName("");
                user.User.LastName("");
            }
        });
    };
    ;
    //Закрыть редактирование пользователя
    UserAction.prototype.closeEditUser = function () {
        ViewModel.Display(false);
    };
    return UserAction;
}());
var User = (function () {
    function User(id, firstName, lastName) {
        this.Id = ko.observable(id);
        this.FirstName = ko.observable(firstName);
        this.LastName = ko.observable(lastName);
    }
    return User;
}());
var ItemViewModel = (function () {
    function ItemViewModel() {
        //следующая страница
        this.nextPage = function () {
            if (((this.currentPageIndex() + 1) * this.pageSize()) < ItemViewModel.users().length) {
                this.currentPageIndex(this.currentPageIndex() + 1);
            }
            else {
                this.currentPageIndex(0);
            }
        };
        //предыдущая страница
        this.previousPage = function () {
            if (this.currentPageIndex() > 0) {
                this.currentPageIndex(this.currentPageIndex() - 1);
            }
            else {
                this.currentPageIndex((Math.ceil(ItemViewModel.users().length / this.pageSize())) - 1);
            }
        };
        //Передача данных в окно редактирование
        this.editUserDisplay = function (user) {
            ViewModel.Display(true);
            $('#FirstName').val(user.FirstName);
            $('#LastName').val(user.LastName);
            $('#ID').val(user.Id);
        };
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        ItemViewModel.users = ko.observableArray([]);
        var _this = this;
        $.getJSON('/home/GetUsers', function (data) {
            ItemViewModel.users(data);
        });
        this.currentPage = ko.computed(function () {
            var pagesize = parseInt(_this.pageSize().toString(), 10), startIndex = pagesize * _this.currentPageIndex(), endIndex = startIndex + pagesize;
            return ItemViewModel.users.slice(startIndex, endIndex);
        });
    }
    return ItemViewModel;
}());
$(document).ready(function () {
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});
