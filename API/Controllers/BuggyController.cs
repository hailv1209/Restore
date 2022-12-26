using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() {
            return BadRequest(new ProblemDetails{Title= "this is a bad request"});
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised() {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError() {
            ModelState.AddModelError("proplem1", "This is a proplem 1");
            ModelState.AddModelError("proplem2", "This is a proplem 2");
                return ValidationProblem();

        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() {
            throw new Exception ("this is a server error");
        }
    }
}