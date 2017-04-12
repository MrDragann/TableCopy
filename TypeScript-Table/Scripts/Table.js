/// <reference path="requiere/init.ts" />
define(["require", "exports", "components/user/table/index", "components/user/add/index", "requiere/init"], function (require, exports, Table, Add, components) {
    "use strict";
    $(document).ready(function () {
        var viewModel = {
            Table: new Table.Component.ItemViewModel(),
            Add: new Add.Component.AddUser()
        };
        ko.applyBindings(viewModel);
    });
    var Components = components;
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
            this.User = new User();
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
});
//# sourceMappingURL=Table.js.map