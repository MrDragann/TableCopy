using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using TypeScript_Table.Models;

namespace TypeScript_Table.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var students = UsersRepository.GetUsers();
            return View(students);
        }

     
        public JsonResult GetUsers()
        {
            var jsondata = UsersRepository.GetUsers();
            return Json(jsondata, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AddUsers(Users user)
        {
            UsersRepository.InsertUser(user);
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditUser(Users user)
        {
            UsersRepository.EditUser(user);
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteUser(int Id)
        {
            UsersRepository.DeleteUser(Id);
            return Json("Удален");
        }
    }
}