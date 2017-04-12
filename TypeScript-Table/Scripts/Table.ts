/// <reference path="requiere/init.ts" />

///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />

///<reference path="typings/requirejs/require.d.ts" />

import Table = require("components/user/table/index");
import Add = require("components/user/add/index");
$(document).ready(function () {
    var viewModel = {
        Table: new Table.Component.ItemViewModel(),
        Add: new Add.Component.AddUser()
    };
        ko.applyBindings(viewModel);

    });


import components = require("requiere/init");
var Components = components;

/**
 * Константы для подключение к контролеру
 */
const DeleteUser = "/home/DeleteUser/";
const AddUser = "/home/AddUsers";
const EditUser = '/home/EditUser';
const GetUser = '/home/GetUsers';
/**
 * Модель таблицы
 */
    class TableModel {
       
      
        User: User = new User();
        //Модальное окно для редактирование пользователя
        static Display: KnockoutObservable<boolean>;
        constructor() {
            TableModel.Display = ko.observable(false);
        }
    };
    /**
     * Модель пользователя
     */
    class User {
        Id: KnockoutObservable<number>;
        FirstName: KnockoutObservable<string>;
        LastName: KnockoutObservable<string>;
        constructor(id?: number, firstName?: string, lastName?: string) {
            this.Id = ko.observable(id);
            this.FirstName = ko.observable(firstName);
            this.LastName = ko.observable(lastName);
        }
    }
