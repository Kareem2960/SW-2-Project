USE TaskFlow;
GO

CREATE VIEW V_User_Details AS
SELECT 
    u.Id, 
    u.UserName, 
    u.FirstName, 
    u.LastName, 
    u.Email, 
    u.Age, 
    u.IsApproved, 
    u.CreatedAt, 
    CAST('User' AS NVARCHAR(50)) AS Roles 
FROM Users u;
GO
