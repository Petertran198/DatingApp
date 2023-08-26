using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

//Overide Entity Framework convention for create a table called Photo => Photos
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string PublicId { get; set; }

}