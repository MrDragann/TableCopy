//import ko = require("knockout");
//import Users = require('components/AddUser/AddUser');
//module ViewModel {
//    export class ItemViewModel {
//        public static Collection: KnockoutObservableArray<any>;
//        currentPage: any;
//        pageSize: KnockoutObservable<string>;
//        currentPageIndex: KnockoutObservable<number>;
//        static sortType: string;
//        iconType: KnockoutObservable<string>;
//        readonlyTemplate: KnockoutObservable<any>;
//        editTemplate: KnockoutObservable<any>;
//        currentTemplate: any;
//        static resetTemplate: any;
//        currentColumn: KnockoutObservable<string>;
//        constructor() {
//            //Инцилизация пагинации
//            this.currentPage = ko.observableArray([]);
//            this.pageSize = ko.observable('5');
//            this.currentPageIndex = ko.observable(0);
//            //Инцилизация колекции таблицы
//            ItemViewModel.Collection = ko.observableArray([]);
//            this.getCollection();
//            // Сортировка таблицы
//            ItemViewModel.sortType = "ascending";
//            this.iconType = ko.observable("");
//            var _this = this;
//            this.currentColumn = ko.observable("");
//            this.readonlyTemplate = ko.observable("readonlyTemplate");
//            this.editTemplate = ko.observable();
//            this.currentPage = ko.computed(function () {
//                var pagesize = parseInt(_this.pageSize().toString(), 10),
//                    startIndex = pagesize * _this.currentPageIndex(),
//                    endIndex = startIndex + pagesize;
//                return ItemViewModel.Collection.slice(startIndex, endIndex);
//            });
//            this.currentTemplate = function (tmpl) {
//                return tmpl === _this.editTemplate() ? 'editTemplate' : _this.readonlyTemplate();
//            };
//            // Сброс шаблона на обычный
//            ItemViewModel.resetTemplate = function (t) {
//                _this.editTemplate("readonlyTemplate");
//            };
//        }
//        /**
//        * Загрузка коллекции с сервера
//        */
//        getCollection(): void {
//            $.getJSON(GetUser, function (data) {
//                ItemViewModel.Collection(data);
//            });
//        }
//        //следующая страница
//        nextPage = function () {
//            if (((this.currentPageIndex() + 1) * this.pageSize()) < ItemViewModel.Collection().length) {
//                this.currentPageIndex(this.currentPageIndex() + 1);
//            }
//            else {
//                this.currentPageIndex(0);
//            }
//        };
//        //предыдущая страница
//        previousPage = function () {
//            if (this.currentPageIndex() > 0) {
//                this.currentPageIndex(this.currentPageIndex() - 1);
//            }
//            else {
//                this.currentPageIndex((Math.ceil(ItemViewModel.Collection().length / this.pageSize())) - 1);
//            }
//        };
//        /**
//         * Сортировка таблицы
//         * @param users Пользователь
//         * @param e Jqvery.Event
//         */
//        sortTable(users: KnockoutObservableArray<Users.AddUser>, e): void {
//            var orderProp = $(e.target).attr("data-column")
//            this.currentColumn(orderProp);
//            ItemViewModel.Collection.sort(function (left, right) {
//                var leftVal = left[orderProp];
//                var rightVal = right[orderProp];
//                if (ItemViewModel.sortType == "ascending") {
//                    return leftVal < rightVal ? 1 : -1;
//                }
//                else {
//                    return leftVal > rightVal ? 1 : -1;
//                }
//            });
//            // Смена иконки
//            ItemViewModel.sortType = (ItemViewModel.sortType == "ascending") ? "descending" : "ascending";
//            this.iconType((ItemViewModel.sortType == "ascending") ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down");
//        };
//    }
//export = ViewModel;
//// return the 'class' which is the constructor function
////return ClickToEditViewModel;
///**
// * Url добавления студента
// */
//const ConstAddUser = "/home/AddUsers"; 
//# sourceMappingURL=TableUsers.js.map