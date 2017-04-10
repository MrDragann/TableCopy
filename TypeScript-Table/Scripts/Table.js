///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
///<reference path="typings/requirejs/require.d.ts" />
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
                ItemViewModel.Collection.push(data);
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
        //Инцилизация пагинации
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        //Инцилизация колекции таблицы
        ItemViewModel.Collection = ko.observableArray([]);
        this.getCollection();
        // Сортировка таблицы
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
/**
* Компонент для регистрации пользовотеля
*/
ko.components.register('Add-User', {
    viewModel: function (params) {
        this.viewModel = params.$root;
        this.User = this.viewModel.User;
    }, template: '<div class="col-md-3"><div class="panel panel-info"><div class="panel-heading"><h2 class="panel-title">Добавить нового пользователя</h2></div>'
        + '<div class="panel-body">'
        + '<form role="form">'
        + '<div class="form-group"><label for="inpFirstName" > Имя </label> <input id="inpFirstName" type="text" class="form-control" data-bind="value:User.FirstName" /></div>'
        + '<div class="form-group"> <label for="inpLastName" > Фамилия </label> <input id="inpLastName" type="text" class="form-control" data-bind="value: User.LastName" /></div>'
        + '</form>'
        + '<input type="button" id= "btnAddUser" class="btn btn-primary" value="Добавить" data-bind="click: $root.UserAction.addUser" />'
        + '</div></div></div>'
});
/**
* Компонент таблицы пользовотелей
*/
ko.components.register('Table-Users', {
    viewModel: function (params) {
        this.viewModel = params.$root;
        this.User = this.viewModel.User;
        this.ItemViewModel = this.viewModel.ItemViewModel;
    }, template: '<div class="col-md-9" style="float:right;">    <div class="panel panel-primary"><div class="panel-heading"><h2 class="panel-title">Список пользователй</h2></div>'
        + '<div class="panel-body"><table class="table table-striped table-bordered table-condensed" data-bind="with: ItemViewModel"><thead>'
        + '<tr data-bind="click: sortTable"><th data-column="Id">ID <span>  <i data-bind="attr: { class: iconType }"></i></span></th>'
        + '<th data-column="FirstName">Имя<span><i data-bind="attr: { class: iconType }"></i></span></th><th data-column="LastName"> Фамилия<span><i data-bind="attr: { class: iconType }"></i> </span></th><th></th><th></th></tr>'
        + '</thead>'
        + '<tbody data-bind="template: { name: currentTemplate, foreach: $root.ItemViewModel.currentPage }"></tbody>'
        + '<tfoot><tr><td colspan="7">Отобразить на странице:<select id="pageSizeSelector" data-bind="value: pageSize" ><option value="5" > 5 </option><option value="10" > 10 </option>'
        + '<option value= 15" > 15 </option><option value="20" > 20 </option><option value="25" > 25 </option><option value="30" > 30 </option></select>'
        + '<span style="padding-left:20px;" ><button data-bind="click: previousPage($data)" class="btn btn-sm" > <i class="glyphicon glyphicon-step-backward" > </i></button>Страница <label data-bind="text: currentPageIndex() + 1" class="badge" > </label>'
        + '<button data-bind="click: nextPage($data)" class="btn btn-sm" > <i class="glyphicon glyphicon-step-forward" > </i></button></span></td></tr></tfoot></table>'
});
$(document).ready(function () {
    var viewModel = new TableModel();
    ko.applyBindings(viewModel);
});
//# sourceMappingURL=Table.js.map