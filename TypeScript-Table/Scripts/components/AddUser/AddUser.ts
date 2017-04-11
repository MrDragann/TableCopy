/*
    click-to-edit component viewmodel file
    loaded for the click-to-edit viewmodel
 */
import ko = require("knockout");
import test = require("components/TableUsers/TableUsers");
module ViewModel {
   


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
                    test.ItemViewModel.Collection.push(data);
                },
                error: function () {
                    console.log(dataObject);
                }
            });
        };

    }

}
export = ViewModel;
// return the 'class' which is the constructor function
//return ClickToEditViewModel;
/**
 * Url добавления студента
 */
const ConstAddUser = "/home/AddUsers";