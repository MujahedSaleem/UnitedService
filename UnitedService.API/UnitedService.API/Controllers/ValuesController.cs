namespace UnitedService.API.Controllers
{
  using Microsoft.AspNetCore.Cors;
  using Microsoft.AspNetCore.Mvc;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using UnitedService.API.Data;
  using UnitedService.API.Model;

  /// <summary>
  /// Defines the <see cref="ValuesController" />
  /// </summary>
  [Route("api/[controller]")]
  [ApiController]
  [EnableCors("CorsPolicy")]
  public class ValuesController : ControllerBase
  {
    /// <summary>
    /// Defines the ObjDataBase
    /// </summary>
    internal FreeWorkDataAccessLayer ObjDataBase = new FreeWorkDataAccessLayer();

    // GET api/values/5
    /// <summary>
    /// The Get
    /// </summary>
    /// <param name="id">The id<see cref="string"/></param>
    /// <returns>The <see cref="Task{ActionResult{LinkedList{Post}}}"/></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<LinkedList<Post>>> Get(string id)
    {
      return await ObjDataBase.GetAllPosts(id);
    }

    // POST api/values
    /// <summary>
    /// The Post
    /// </summary>
    /// <param name="value">The value<see cref="string"/></param>
    /// <returns>The <see cref="Task{IActionResult}"/></returns>
    [HttpPost]
    public async Task<IActionResult> Post([FromHeader] string value)
    {
      var users = await this.ObjDataBase.getUsers(value);
      return Ok(users);
    }

    // PUT api/values/5
    /// <summary>
    /// The Put
    /// </summary>
    /// <param name="id">The id<see cref="int"/></param>
    /// <param name="value">The value<see cref="string"/></param>
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    /// <summary>
    /// The Delete
    /// </summary>
    /// <param name="id">The id<see cref="int"/></param>
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
