///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />

class ViewModel  {
    ItemViewModel: ItemViewModel = new ItemViewModel();
    UserAction: UserAction = new UserAction();
    User: User = new User(null, '', '');
    static Display: KnockoutObservable<boolean>;
    constructor() {
        ViewModel.Display = ko.observable(false);
    }
};
class UserAction {
    //Добавление пользователя
    addUser(user: any): void {
        
        var dataObject = ko.toJSON(user.User);
        $.ajax({
            url: '/home/AddUsers',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                console.log(dataObject);
                ItemViewModel.users.push(data);
                user.User.FirstName("");
                user.User.LastName("");
            },
            error: function () {
                console.log(dataObject);
            }
        });
    };
    //Удаление пользователя
    removeUsers(user: User): void {
        $.ajax({
            url: '/home/DeleteUser/' + user.Id,
            type: 'post',
            contentType: 'application/json',
            success: function () {
                ItemViewModel.users.remove(user);
            }
        });
    }
      //Редактирование пользователя
    editUser(user: any): void {
        user.User.Id = $("#ID").val();
        var dataObject = ko.toJSON(user);
        $.ajax({
            url: '/home/EditUser',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                user.User.FirstName("");
                user.User.LastName("");
            }
        });
    };
    //Закрыть редактирование пользователя
    closeEditUser(): void {
        ViewModel.Display(false);
    }
}

class User {
    Id: KnockoutObservable<number>;
    FirstName: KnockoutObservable<string>;
    LastName: KnockoutObservable<string>;
    constructor(id: number, firstName: string,lastName: string) {
        this.Id = ko.observable(id);
        this.FirstName = ko.observable(firstName);
        this.LastName = ko.observable(lastName);
    }
  
  
}
class ItemViewModel {

    public static users: KnockoutObservableArray<User>;
    currentPage: any;
    pageSize: KnockoutObservable<string>;
    currentPageIndex: KnockoutObservable<number>;
   
   
    constructor() {
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        ItemViewModel.users = ko.observableArray([]);
        var _this = this;
        $.getJSON('/home/GetUsers', function (data) {
         
            ItemViewModel.users(data);
        });
        this.currentPage = ko.computed(function () {
            var pagesize = parseInt(_this.pageSize().toString(), 10),
                startIndex = pagesize * _this.currentPageIndex(),
                endIndex = startIndex + pagesize;
            return ItemViewModel.users.slice(startIndex, endIndex);
        });
    }
    //следующая страница
    nextPage = function () {
        if (((this.currentPageIndex() + 1) * this.pageSize()) < ItemViewModel.users().length) {
            this.currentPageIndex(this.currentPageIndex() + 1);
        }
        else {
            this.currentPageIndex(0);
        }
    };
    //предыдущая страница
    previousPage = function () {
        if (this.currentPageIndex() > 0) {
            this.currentPageIndex(this.currentPageIndex() - 1);
        }
        else {
            this.currentPageIndex((Math.ceil(ItemViewModel.users().length / this.pageSize())) - 1);
        }
    };
   
    //Передача данных в окно редактирование
    editUserDisplay = function (user) {
        ViewModel.Display(true);
        $('#FirstName').val(user.FirstName);
        $('#LastName').val(user.LastName);
        $('#ID').val(user.Id);
       
    }
 
}
$(document).ready(function () {
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel);
});