-- =====================================================
-- Add 4th Project to TaskFlow
-- =====================================================

USE TaskFlow_Project;
GO

-- Project 2: Cloud Infrastructure Setup
IF NOT EXISTS (SELECT * FROM projects WHERE name = 'Cloud Infrastructure Setup')
BEGIN
    INSERT INTO projects (name, manager_id) VALUES 
        ('Cloud Infrastructure Setup', 2);
    PRINT 'Project "Cloud Infrastructure Setup" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Cloud Infrastructure Setup" already exists';
END
GO

-- Project 3: Mobile App Development
IF NOT EXISTS (SELECT * FROM projects WHERE name = 'Mobile App Development')
BEGIN
    INSERT INTO projects (name, manager_id) VALUES 
        ('Mobile App Development', 2);
    PRINT 'Project "Mobile App Development" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Mobile App Development" already exists';
END
GO

-- Project 4: Database Migration
IF NOT EXISTS (SELECT * FROM projects WHERE name = 'Database Migration')
BEGIN
    INSERT INTO projects (name, manager_id) VALUES 
        ('Database Migration', 2);
    PRINT 'Project "Database Migration" created successfully';
END
ELSE
BEGIN
    PRINT 'Project "Database Migration" already exists';
END
GO

-- Assign User (ID=3) to all projects
-- Cloud Infrastructure Setup
IF NOT EXISTS (SELECT * FROM project_members WHERE project_id = 2 AND user_id = 3)
BEGIN
    INSERT INTO project_members (project_id, user_id) VALUES (2, 3);
    PRINT 'User assigned to Cloud Infrastructure Setup project';
END
GO

-- Mobile App Development
IF NOT EXISTS (SELECT * FROM project_members WHERE project_id = 3 AND user_id = 3)
BEGIN
    INSERT INTO project_members (project_id, user_id) VALUES (3, 3);
    PRINT 'User assigned to Mobile App Development project';
END
GO

-- Database Migration
IF NOT EXISTS (SELECT * FROM project_members WHERE project_id = 4 AND user_id = 3)
BEGIN
    INSERT INTO project_members (project_id, user_id) VALUES (4, 3);
    PRINT 'User assigned to Database Migration project';
END
GO

PRINT '=== 4th Project Added Successfully ===';
PRINT '';
