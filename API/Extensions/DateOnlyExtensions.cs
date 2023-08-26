using System;


public static class DateOnlyExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {
        var currentDate = DateOnly.FromDateTime(DateTime.Now);
        var age = currentDate.Year - dateOfBirth.Year; 

        if(dateOfBirth < currentDate.AddYears(-age)){
            age -= 1;
        }
        return age; 
    }
}
