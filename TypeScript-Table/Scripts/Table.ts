///<reference path="typings/jquery/jquery.d.ts" />
///<reference path="typings/knockout/knockout.d.ts" />

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
class TableModel  {
    ItemViewModel: ItemViewModel = new ItemViewModel();
    UserAction: UserAction = new UserAction();
    User: User = new User(null, '', '');
    //Модальное окно для редактирование пользователя
    static Display: KnockoutObservable<boolean>;
    constructor() {
    TableModel.Display = ko.observable(false);
    }
};

/**
 * Действия над пользователем
 */
class UserAction {
   /**
    * Добавление пользователя
    * @param user Модель таблицы
    */
    addUser(user: any): void {        
        var dataObject = ko.toJSON(user.User);
        $.ajax({
            url: AddUser,
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
    /**
     * Удаление пользователя
     * @param user Пользователь
     */
    removeUsers(user: User): void {
        $.ajax({
            url: DeleteUser + user.Id,
            type: 'post',
            contentType: 'application/json',
            success: function () {
                ItemViewModel.users.remove(user);
            }
        });
    }
      /**
       * 
       * @param user Модель таблицы
       */
        editUser(user: any): void {
        user.User.Id = $("#ID").val();
        user.User.FirstName = $("#FirstName").val();
        user.User.LastName = $("#LastName").val();
        var dataObject = ko.toJSON(user);
        $.ajax({
            url: EditUser,
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function () {
                $.getJSON('/home/GetUsers', function (data) {
                    ItemViewModel.users(data);
                    TableModel.Display(false);
                });
            }
        });
    };
    /**
     * Закрыть окно с редактированием
     */
    closeEditUser(): void {
        TableModel.Display(false);
    }
}

/**
 * Модель пользователя
 */
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
/**
 * Управление таблицей
 */
class ItemViewModel {
    
    public static users: KnockoutObservableArray<User>;
    currentPage: any;
    pageSize: KnockoutObservable<string>;
    currentPageIndex: KnockoutObservable<number>;
    static sortType: string;
    iconType: KnockoutObservable<string>;
    constructor() {
        this.currentPage = ko.observableArray([]);
        this.pageSize = ko.observable('5');
        this.currentPageIndex = ko.observable(0);
        ItemViewModel.users = ko.observableArray([]);
        ItemViewModel.sortType = "ascending";
        this.iconType = ko.observable("");
        var _this = this;
        $.getJSON(GetUser, function (data) {
         
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
    /**
     * Сортировка таблицы
     * @param users Пользователь
     * @param e Jqvery.Event
     */
    sortTable(users: KnockoutObservableArray<User>, e): void {
        var orderProp = $(e.target).attr("data-column")
        ItemViewModel.users.sort(function (left, right) {
            var leftVal = left[orderProp];
            var rightVal = right[orderProp];
            if (ItemViewModel.sortType == "ascending") {
                return leftVal < rightVal ? 1 : -1;
            }
            else {
                return leftVal > rightVal ? 1 : -1;
            }
        });
        // Смена иконки
        ItemViewModel.sortType = (ItemViewModel.sortType == "ascending") ? "descending" : "ascending";
        this.iconType((ItemViewModel.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
    };

    //Передача данных в окно редактирование
    editUserDisplay = function (user) {
        TableModel.Display(true);
        $('#FirstName').val(user.FirstName);
        $('#LastName').val(user.LastName);
        $('#ID').val(user.Id);
       
    }
 
}
$(document).ready(function () {
    var viewModel = new TableModel();
    ko.applyBindings(viewModel);
});