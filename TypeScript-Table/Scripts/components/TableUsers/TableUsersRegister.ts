
import ViewModel = require('components/TableUsers/TableUsers');
// register the component
ko.components.register("Table-Users", {
    viewModel: ViewModel.ItemViewModel,
    template: { require: "text!components/TableUsers/TableUsersHTML.html" }
});