define(["require", "exports", 'components/AddUser/AddUser'], function (require, exports, ViewModel) {
    "use strict";
    // register the component
    ko.components.register("Add-User", {
        viewModel: ViewModel.AddUser,
        template: { require: "text!components/AddUser/AddUserHTML.html" }
    });
});
//# sourceMappingURL=AddUserRegister.js.map