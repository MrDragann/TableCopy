define(["require", "exports", 'components/TableUsers/TableUsers'], function (require, exports, ViewModel) {
    "use strict";
    // register the component
    ko.components.register("Table-Users", {
        viewModel: ViewModel.ItemViewModel,
        template: { require: "text!components/TableUsers/TableUsersHTML.html" }
    });
});
//# sourceMappingURL=TableUsersRegister.js.map