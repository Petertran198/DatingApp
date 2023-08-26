namespace API.Entities;

//Convention name context class with App
// This is our hashed user.
public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set;}

    public byte[] PasswordHash {get; set;}
    public byte[] PasswordSalt {get; set;}

    
}
