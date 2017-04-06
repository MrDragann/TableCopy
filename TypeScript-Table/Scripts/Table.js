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
        this.User = new User(null, 'ss', 'ss');
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
        var dataObject = ko.toJSON(user);
        $.ajax({
            url: AddUser,
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                console.log(dataObject);
                ItemViewModel.Collection.push(data);
                user.FirstName("");
                user.LastName("");
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
                ItemViewModel.Collection.remove(user);
            }
        });
    };
    /**
     *
     * @param user Модель таблицы
     */
    UserAction.prototype.editUser = function (data) {
        var user = {
            Id: data.Id,
            FirstName: data.FirstName,
            LastName: data.LastName,
        };
        $.ajax({
            url: EditUser,
            type: 'post',
            data: user,
            success: function () {
                $.getJSON('/home/GetUsers', function (data) {
                    ItemViewModel.Collection(data);
                    TableModel.Display(false);
                });
            }
        });
    };
    ;
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
            if (((this.currentPageIndex() + 1) * this.pageSize()) < ItemViewModel.Collection().length) {
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
                this.currentPageIndex((Math.ceil(ItemViewModel.Collection().length / this.pageSize())) - 1);
            }
        };
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        ItemViewModel.Collection = ko.observableArray([]);
        this.getCollection();
        ItemViewModel.sortType = "ascending";
        this.iconType = ko.observable("");
        var _this = this;
        this.currentColumn = ko.observable("");
        this.readonlyTemplate = ko.observable("readonlyTemplate");
        this.editTemplate = ko.observable();
        this.currentPage = ko.computed(function () {
            var pagesize = parseInt(_this.pageSize().toString(), 10), startIndex = pagesize * _this.currentPageIndex(), endIndex = startIndex + pagesize;
            return ItemViewModel.Collection.slice(startIndex, endIndex);
        });
        this.currentTemplate = function (tmpl) {
            return tmpl === _this.editTemplate() ? 'editTemplate' : _this.readonlyTemplate();
        };
        // Сброс шаблона на обычный
        ItemViewModel.resetTemplate = function (t) {
            _this.editTemplate("readonlyTemplate");
        };
    }
    /**
    * Загрузка коллекции с сервера
    */
    ItemViewModel.prototype.getCollection = function () {
        $.getJSON(GetUser, function (data) {
            ItemViewModel.Collection(data);
        });
    };
    /**
     * Сортировка таблицы
     * @param users Пользователь
     * @param e Jqvery.Event
     */
    ItemViewModel.prototype.sortTable = function (users, e) {
        var orderProp = $(e.target).attr("data-column");
        this.currentColumn(orderProp);
        ItemViewModel.Collection.sort(function (left, right) {
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
ko.components.register('Add-User', {
    viewModel: function (params) {
        this.FirstName = params.User.FirstName();
        this.LastName = params.User.LastName();
    }, template: '<div class="col-md-3"><div class="panel panel-info"><div class="panel-heading"><h2 class="panel-title">Добавить нового пользователя</h2></div>'
        + '<div class="panel-body">'
        + '<form role="form">'
        + '<div class="form-group"><label for="inpFirstName" > Имя </label> <input id="inpFirstName" type="text" class="form-control" data-bind="value: FirstName" /></div>'
        + '<div class="form-group"> <label for="inpLastName" > Фамилия </label> <input id="inpLastName" type="text" class="form-control" data-bind="value: LastName" /></div>'
        + '</form>'
        + '<input type="button" id= "btnAddUser" class="btn btn-primary" value="Добавить" data-bind="click: $root.UserAction.addUser" />'
        + '</div></div></div>'
});
$(document).ready(function () {
    var viewModel = new TableModel();
    ko.applyBindings(viewModel);
});
