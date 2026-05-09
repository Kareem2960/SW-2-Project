USE TaskFlow;
GO

DROP VIEW V_User_Details;
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

-- Test the view
SELECT TOP (1000) [Id], [UserName], [FirstName], [LastName], [Email], [Age], [IsApproved], [CreatedAt], [Roles]
FROM V_User_Details
WHERE [UserName] LIKE '%kareem%';
GO
