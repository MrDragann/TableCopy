

import ViewModel = require('components/AddUser/AddUser');
// register the component
ko.components.register("Add-User", {
    viewModel: ViewModel.AddUser,
    template: { require: "text!components/AddUser/AddUserHTML.html" }
});