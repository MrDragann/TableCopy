define(['jquery', 'knockout'], function ($, ko) {
    ko.components.register('AddUser', {
        require: 'Scripts/AddUser'
    });
    ko.applyBindings();
});