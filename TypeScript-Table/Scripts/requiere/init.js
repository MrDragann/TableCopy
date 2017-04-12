define(["require", "exports", "components/user/add/index", "components/user/table/index"], function (require, exports, Add, Table) {
    "use strict";
    // регистрация компонентов
    ko.components.register("Add-User", {
        viewModel: Add.Component.AddUser,
        template: { require: "text!components/user/add/template/index.html" }
    });
    ko.components.register("Table-Users", {
        viewModel: Table.Component.ItemViewModel,
        template: { require: "text!components/user/table/template/index.html" }
    });
});
//# sourceMappingURL=init.js.map