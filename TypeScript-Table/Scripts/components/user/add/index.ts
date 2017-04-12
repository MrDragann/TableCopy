
import ko = require("knockout");
import Table = require("components/user/table/index");

export namespace Component {
   
    export class AddUser {
        Id: KnockoutObservable<number>;
        FirstName: KnockoutObservable<string>;
        LastName: KnockoutObservable<string>;
        constructor(id?: number, firstName?: string, lastName?: string) {
            this.Id = ko.observable(id);
            this.FirstName = ko.observable(firstName);
            this.LastName = ko.observable(lastName);
        }
        /**
         * Добавление пользователя
         * @param user Модель таблицы
         */
        addUser(user: AddUser): void {
            var dataObject = ko.toJSON(user);
            $.ajax({
                url: ConstAddUser,
                type: 'post',
                data: dataObject,
                contentType: 'application/json',
                success: function (data) {
                    console.log(dataObject);
                    user.FirstName('');
                    Table.Component.ItemViewModel.Collection.push(data);
                },
                error: function () {
                    console.log(dataObject);
                }
            });
        };

    }

}
/**
 * Url добавления студента
 */
const ConstAddUser = "/home/AddUsers";