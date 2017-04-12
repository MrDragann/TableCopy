define(["require", "exports", "knockout", "components/TableUsers/TableUsers"], function (require, exports, ko, test) {
    "use strict";
    var ViewModel;
    (function (ViewModel) {
        var AddUser = (function () {
            function AddUser(id, firstName, lastName) {
                this.Id = ko.observable(id);
                this.FirstName = ko.observable(firstName);
                this.LastName = ko.observable(lastName);
            }
            /**
                    * Добавление пользователя
                    * @param user Модель таблицы
                    */
            AddUser.prototype.addUser = function (user) {
                var dataObject = ko.toJSON(user);
                $.ajax({
                    url: ConstAddUser,
                    type: 'post',
                    data: dataObject,
                    contentType: 'application/json',
                    success: function (data) {
                        console.log(dataObject);
                        user.FirstName('');
                        test.ItemViewModel.Collection.push(data);
                    },
                    error: function () {
                        console.log(dataObject);
                    }
                });
            };
            ;
            return AddUser;
        }());
        ViewModel.AddUser = AddUser;
    })(ViewModel || (ViewModel = {}));
    // return the 'class' which is the constructor function
    //return ClickToEditViewModel;
    /**
     * Url добавления студента
     */
    var ConstAddUser = "/home/AddUsers";
    return ViewModel;
});
//# sourceMappingURL=AddUser.js.map