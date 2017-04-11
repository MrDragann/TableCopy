///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />
define(["require", "exports", "components/AddUser/AddUserRegister", "components/TableUsers/TableUsersRegister"], function (require, exports, UserAdd, UsersTable) {
    "use strict";
    ///<reference path="typings/requirejs/require.d.ts" />
    $(document).ready(function () {
        var viewModel = {
            UserAction: new UserAction()
        };
        ko.applyBindings(viewModel);
    });
    var userAdd = UserAdd;
    var userTable = UsersTable;
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
        return UserAction;
    }());
});
//# sourceMappingURL=Table.js.map