///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
/**
 * Константы для подключение к контролеру
 */
var DeleteUser = "/home/DeleteUser/";
var AddUser = "/home/AddUsers";
var EditUser = '/home/EditUser';
var GetUser = '/home/GetUsers';
/**
 * Модель таблицы
 */
var TableModel = (function () {
    function TableModel() {
        this.ItemViewModel = new ItemViewModel();
        this.UserAction = new UserAction();
        this.User = new User(null, '', '');
        TableModel.Display = ko.observable(false);
    }
    return TableModel;
}());
;
/**
 * Действия над пользователем
 */
var UserAction = (function () {
    function UserAction() {
    }
    /**
     * Добавление пользователя
     * @param user Модель таблицы
     */
    UserAction.prototype.addUser = function (user) {
        var dataObject = ko.toJSON(user.User);
        $.ajax({
            url: AddUser,
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
    /**
     * Удаление пользователя
     * @param user Пользователь
     */
    UserAction.prototype.removeUsers = function (user) {
        $.ajax({
            url: DeleteUser + user.Id,
            type: 'post',
            contentType: 'application/json',
            success: function () {
                ItemViewModel.users.remove(user);
            }
        });
    };
    /**
     *
     * @param user Модель таблицы
     */
    UserAction.prototype.editUser = function (user) {
        user.User.Id = $("#ID").val();
        user.User.FirstName = $("#FirstName").val();
        user.User.LastName = $("#LastName").val();
        var dataObject = ko.toJSON(user);
        $.ajax({
            url: EditUser,
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function () {
                $.getJSON('/home/GetUsers', function (data) {
                    ItemViewModel.users(data);
                    TableModel.Display(false);
                });
            }
        });
    };
    ;
    /**
     * Закрыть окно с редактированием
     */
    UserAction.prototype.closeEditUser = function () {
        TableModel.Display(false);
    };
    return UserAction;
}());
/**
 * Модель пользователя
 */
var User = (function () {
    function User(id, firstName, lastName) {
        this.Id = ko.observable(id);
        this.FirstName = ko.observable(firstName);
        this.LastName = ko.observable(lastName);
    }
    return User;
}());
/**
 * Управление таблицей
 */
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
            TableModel.Display(true);
            $('#FirstName').val(user.FirstName);
            $('#LastName').val(user.LastName);
            $('#ID').val(user.Id);
        };
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        ItemViewModel.users = ko.observableArray([]);
        ItemViewModel.sortType = "ascending";
        this.iconType = ko.observable("");
        var _this = this;
        $.getJSON(GetUser, function (data) {
            ItemViewModel.users(data);
        });
        this.currentPage = ko.computed(function () {
            var pagesize = parseInt(_this.pageSize().toString(), 10), startIndex = pagesize * _this.currentPageIndex(), endIndex = startIndex + pagesize;
            return ItemViewModel.users.slice(startIndex, endIndex);
        });
    }
    /**
     * Сортировка таблицы
     * @param users Пользователь
     * @param e Jqvery.Event
     */
    ItemViewModel.prototype.sortTable = function (users, e) {
        var orderProp = $(e.target).attr("data-column");
        ItemViewModel.users.sort(function (left, right) {
            var leftVal = left[orderProp];
            var rightVal = right[orderProp];
            if (ItemViewModel.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        // Смена иконки
        ItemViewModel.sortType = (ItemViewModel.sortType == "ascending") ? "descending" : "ascending";
        this.iconType((ItemViewModel.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };
    ;
    return ItemViewModel;
}());
$(document).ready(function () {
    var viewModel = new TableModel();
    ko.applyBindings(viewModel);
});
