-- =====================================================
-- Create Sample Projects for TaskFlow
-- Assign projects to users for testing
-- =====================================================

USE TaskFlow;
GO

-- =====================================================
-- Insert Sample Projects
-- =====================================================

-- Project 1: Website Redesign
IF NOT EXISTS (SELECT * FROM Projects WHERE Name = 'Website Redesign')
BEGIN
    INSERT INTO Projects (Name, Description, Status, StartDate, EndDate, CreatedBy, CreatedAt) VALUES 
        ('Website Redesign', 'Complete redesign of the company website with modern UI/UX', 'Active', '2024-01-15', '2024-06-30', 2, GETDATE());
    PRINT 'Project "Website Redesign" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Website Redesign" already exists';
END
GO

-- Project 2: Mobile App Development
IF NOT EXISTS (SELECT * FROM Projects WHERE Name = 'Mobile App Development')
BEGIN
    INSERT INTO Projects (Name, Description, Status, StartDate, EndDate, CreatedBy, CreatedAt) VALUES 
        ('Mobile App Development', 'Develop a cross-platform mobile application for customer engagement', 'Active', '2024-02-01', '2024-08-15', 2, GETDATE());
    PRINT 'Project "Mobile App Development" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Mobile App Development" already exists';
END
GO

-- Project 3: Database Migration
IF NOT EXISTS (SELECT * FROM Projects WHERE Name = 'Database Migration')
BEGIN
    INSERT INTO Projects (Name, Description, Status, StartDate, EndDate, CreatedBy, CreatedAt) VALUES 
        ('Database Migration', 'Migrate legacy database systems to cloud-based solution', 'Planning', '2024-03-01', '2024-12-31', 2, GETDATE());
    PRINT 'Project "Database Migration" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Database Migration" already exists';
END
GO

-- =====================================================
-- Assign Members to Projects
-- =====================================================

-- Assign User (ID=3) to Website Redesign Project (ID=1)
IF NOT EXISTS (SELECT * FROM Project_Members WHERE ProjectId = 1 AND UserId = 3)
BEGIN
    INSERT INTO Project_Members (ProjectId, UserId, Role, JoinedAt, IsActive) VALUES 
        (1, 3, 'Developer', GETDATE(), 1);
    PRINT 'User assigned to Website Redesign project';
END
ELSE
BEGIN
    PRINT 'User already assigned to Website Redesign project';
END
GO

-- Assign User (ID=3) to Mobile App Development Project (ID=2)
IF NOT EXISTS (SELECT * FROM Project_Members WHERE ProjectId = 2 AND UserId = 3)
BEGIN
    INSERT INTO Project_Members (ProjectId, UserId, Role, JoinedAt, IsActive) VALUES 
        (2, 3, 'Frontend Developer', GETDATE(), 1);
    PRINT 'User assigned to Mobile App Development project';
END
ELSE
BEGIN
    PRINT 'User already assigned to Mobile App Development project';
END
GO

-- Assign User (ID=3) to Database Migration Project (ID=3)
IF NOT EXISTS (SELECT * FROM Project_Members WHERE ProjectId = 3 AND UserId = 3)
BEGIN
    INSERT INTO Project_Members (ProjectId, UserId, Role, JoinedAt, IsActive) VALUES 
        (3, 3, 'Database Analyst', GETDATE(), 1);
    PRINT 'User assigned to Database Migration project';
END
ELSE
BEGIN
    PRINT 'User already assigned to Database Migration project';
END
GO

-- =====================================================
-- Create Sample Tasks for Projects
-- =====================================================

-- Tasks for Website Redesign Project
IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Create wireframes and mockups')
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedUserId, Status, Priority, CreatedBy, CreatedAt) VALUES 
        ('Create wireframes and mockups', 'Design wireframes and high-fidelity mockups for the new website', 1, 3, 'in_progress', 'high', 2, GETDATE());
    PRINT 'Task "Create wireframes and mockups" created';
END
GO

IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Implement responsive design')
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedUserId, Status, Priority, CreatedBy, CreatedAt) VALUES 
        ('Implement responsive design', 'Convert mockups to responsive HTML/CSS', 1, 3, 'todo', 'medium', 2, GETDATE());
    PRINT 'Task "Implement responsive design" created';
END
GO

-- Tasks for Mobile App Development
IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Design app architecture')
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedUserId, Status, Priority, CreatedBy, CreatedAt) VALUES 
        ('Design app architecture', 'Design the overall architecture for the mobile app', 2, 3, 'completed', 'high', 2, GETDATE());
    PRINT 'Task "Design app architecture" created';
END
GO

IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Develop user authentication')
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedUserId, Status, Priority, CreatedBy, CreatedAt) VALUES 
        ('Develop user authentication', 'Implement secure user authentication system', 2, 3, 'in_progress', 'high', 2, GETDATE());
    PRINT 'Task "Develop user authentication" created';
END
GO

-- Tasks for Database Migration
IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Analyze current database structure')
BEGIN
    INSERT INTO Tasks (Title, Description, ProjectId, AssignedUserId, Status, Priority, CreatedBy, CreatedAt) VALUES 
        ('Analyze current database structure', 'Document and analyze the existing database schema', 3, 3, 'completed', 'medium', 2, GETDATE());
    PRINT 'Task "Analyze current database structure" created';
END
GO

-- =====================================================
-- Display Results
-- =====================================================

PRINT '=== Sample Projects Created Successfully ===';
PRINT '';

-- Display all projects with members
SELECT 
    p.Id,
    p.Name,
    p.Description,
    p.Status,
    creator.FirstName + ' ' + creator.LastName AS CreatedByName,
    COUNT(pm.UserId) AS MemberCount,
    COUNT(t.Id) AS TaskCount
FROM Projects p
LEFT JOIN Users creator ON p.CreatedBy = creator.Id
LEFT JOIN Project_Members pm ON p.Id = pm.ProjectId AND pm.IsActive = 1
LEFT JOIN Tasks t ON p.Id = t.ProjectId
GROUP BY p.Id, p.Name, p.Description, p.Status, creator.FirstName, creator.LastName
ORDER BY p.Id;
GO

PRINT '';
PRINT '=== User Project Assignments ===';
PRINT '';

-- Display user project assignments
SELECT 
    u.FirstName + ' ' + u.LastName AS UserName,
    p.Name AS ProjectName,
    pm.Role,
    pm.JoinedAt,
    p.Status AS ProjectStatus
FROM Users u
JOIN Project_Members pm ON u.Id = pm.UserId
JOIN Projects p ON pm.ProjectId = p.Id
WHERE pm.IsActive = 1
ORDER BY u.Id, p.Name;
GO

PRINT '';
PRINT '=== Sample Data Ready ===';
PRINT 'Login as "user" with password "admin123" to see the projects!';
