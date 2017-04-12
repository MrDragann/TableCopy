/// <reference path="../components/user/add/index.ts" />
/// <reference path="../components/user/table/index.ts" />
import Add = require("components/user/add/index");
import Table = require("components/user/table/index");

// регистрация компонентов
ko.components.register("Add-User", {
    viewModel: Add.Component.AddUser,
    template: { require: "text!components/user/add/template/index.html" }
});

ko.components.register("Table-Users", {
    viewModel: Table.Component.ItemViewModel,
    template: { require: "text!components/user/table/template/index.html" }
});