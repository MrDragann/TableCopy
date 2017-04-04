using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TypeScript_Table.Models
{
    public class UsersRepository
    {
        public static List<Users> UsersList = new List<Users>()
        {
            new Users() { Id=1,FirstName="Максим",LastName="Звинаревский"},
            new Users() { Id=2,FirstName="Драган",LastName="Петр" },
         new Users() { Id=3,FirstName="Владимир",LastName="Спивоченко"},
            new Users() { Id=4,FirstName="Дмиртий",LastName="Каменный" },
          new Users() { Id=5,FirstName="Дмитрий",LastName="Лешенко"},
            new Users() { Id=6,FirstName="Юля",LastName="Антонова"},
             new Users() { Id=7,FirstName="Юля",LastName="Липовская"},
            new Users() { Id=8,FirstName="Артем",LastName="Лошак"},
            new Users() { Id=9,FirstName="Павел",LastName="Махнитский" },
            new Users() { Id=10,FirstName="Ваня",LastName="Драгой"},
            new Users() { Id=11,FirstName="Сергей",LastName="Холод" },
             new Users() { Id=12,FirstName="Николай",LastName="Набока"},
            new Users() { Id=13,FirstName="Карина",LastName="Каналы" },
             new Users() { Id=14,FirstName="Екатерина",LastName="Штонда"},
            new Users() { Id=15,FirstName="Иван",LastName="Гицман"}
        };

        public static List<Users> GetUsers()
        {
            return UsersList;
        }

        public static void InsertUser(Users user)
        {
            user.Id = UsersList.Count + 1;
            UsersList.Add(user);
        }
        public static void EditUser(Users user)
        {
            UsersList[user.Id - 1] = user;

        }

        public static void DeleteUser(int userId)
        {
            var user = UsersList.FirstOrDefault(x => x.Id == userId);

            if (user != null)
            {
                UsersList.Remove(user);
            }
        }
    }
}