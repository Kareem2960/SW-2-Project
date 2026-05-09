-- =====================================================
-- Create Sample Users for TaskFlow
-- Admin, Manager, and User Accounts
-- =====================================================

USE TaskFlow;
GO

-- =====================================================
-- Insert Sample Users
-- =====================================================

-- Insert Admin User (if not exists)
IF NOT EXISTS (SELECT * FROM Users WHERE UserName = 'admin')
BEGIN
    INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Age, Email, IsApproved) VALUES 
        ('admin', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'System', 'Administrator', 30, 'admin@taskflow.com', 1);
    PRINT 'Admin user created successfully';
END
ELSE
BEGIN
    PRINT 'Admin user already exists';
END
GO

-- Insert Manager User (if not exists)
IF NOT EXISTS (SELECT * FROM Users WHERE UserName = 'manager')
BEGIN
    INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Age, Email, IsApproved) VALUES 
        ('manager', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'Project', 'Manager', 35, 'manager@taskflow.com', 1);
    PRINT 'Manager user created successfully';
END
ELSE
BEGIN
    PRINT 'Manager user already exists';
END
GO

-- Insert Regular User (if not exists)
IF NOT EXISTS (SELECT * FROM Users WHERE UserName = 'user')
BEGIN
    INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Age, Email, IsApproved) VALUES 
        ('user', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'Regular', 'User', 28, 'user@taskflow.com', 1);
    PRINT 'Regular user created successfully';
END
ELSE
BEGIN
    PRINT 'Regular user already exists';
END
GO

-- =====================================================
-- Assign Roles to Users
-- =====================================================

-- Assign Admin Role to Admin User
IF NOT EXISTS (SELECT * FROM User_Roles WHERE UserId = 1 AND RoleId = 1)
BEGIN
    INSERT INTO User_Roles (UserId, RoleId) VALUES (1, 1);
    PRINT 'Admin role assigned to admin user';
END
ELSE
BEGIN
    PRINT 'Admin user already has admin role';
END
GO

-- Assign Manager Role to Manager User
IF NOT EXISTS (SELECT * FROM User_Roles WHERE UserId = 2 AND RoleId = 3)
BEGIN
    INSERT INTO User_Roles (UserId, RoleId) VALUES (2, 3);
    PRINT 'Manager role assigned to manager user';
END
ELSE
BEGIN
    PRINT 'Manager user already has manager role';
END
GO

-- Assign User Role to Regular User
IF NOT EXISTS (SELECT * FROM User_Roles WHERE UserId = 3 AND RoleId = 2)
BEGIN
    INSERT INTO User_Roles (UserId, RoleId) VALUES (3, 2);
    PRINT 'User role assigned to regular user';
END
ELSE
BEGIN
    PRINT 'Regular user already has user role';
END
GO

-- =====================================================
-- Create Notification Preferences for Each User
-- =====================================================

-- Admin Notification Preferences
IF NOT EXISTS (SELECT * FROM Notification_Preferences WHERE UserId = 1)
BEGIN
    INSERT INTO Notification_Preferences (UserId, EmailNotifications, PushNotifications, TaskAssigned, TaskCompleted, ProjectUpdates) VALUES 
        (1, 1, 1, 1, 1, 1);
    PRINT 'Admin notification preferences created';
END
GO

-- Manager Notification Preferences
IF NOT EXISTS (SELECT * FROM Notification_Preferences WHERE UserId = 2)
BEGIN
    INSERT INTO Notification_Preferences (UserId, EmailNotifications, PushNotifications, TaskAssigned, TaskCompleted, ProjectUpdates) VALUES 
        (2, 1, 1, 1, 1, 1);
    PRINT 'Manager notification preferences created';
END
GO

-- User Notification Preferences
IF NOT EXISTS (SELECT * FROM Notification_Preferences WHERE UserId = 3)
BEGIN
    INSERT INTO Notification_Preferences (UserId, EmailNotifications, PushNotifications, TaskAssigned, TaskCompleted, ProjectUpdates) VALUES 
        (3, 1, 1, 1, 1, 0);
    PRINT 'User notification preferences created';
END
GO

-- =====================================================
-- Display Results
-- =====================================================

PRINT '=== Sample Users Created Successfully ===';
PRINT '';

-- Display all users with their roles
SELECT 
    u.Id,
    u.UserName,
    u.FirstName + ' ' + u.LastName AS FullName,
    u.Email,
    r.Name AS RoleName,
    r.Description AS RoleDescription,
    u.IsApproved
FROM Users u
LEFT JOIN User_Roles ur ON u.Id = ur.UserId
LEFT JOIN Roles r ON ur.RoleId = r.Id
ORDER BY u.Id;
GO

PRINT '';
PRINT '=== Login Credentials ===';
PRINT 'Admin: admin / admin123';
PRINT 'Manager: manager / admin123';
PRINT 'User: user / admin123';
PRINT '';
PRINT 'All users are approved and ready to use!';

-- =====================================================
-- For MySQL Version (if needed)
-- =====================================================

/*
-- MySQL Version (use this if importing to MySQL):

USE taskflow_auth;

-- Insert Admin User
INSERT IGNORE INTO users (user_name, password_hash, first_name, last_name, age, is_approved) VALUES 
    ('admin', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'System', 'Administrator', 30, 1);

-- Insert Manager User
INSERT IGNORE INTO users (user_name, password_hash, first_name, last_name, age, is_approved) VALUES 
    ('manager', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'Project', 'Manager', 35, 1);

-- Insert Regular User
INSERT IGNORE INTO users (user_name, password_hash, first_name, last_name, age, is_approved) VALUES 
    ('user', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'Regular', 'User', 28, 1);

-- Assign Roles
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin gets Admin role
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (2, 3); -- Manager gets Manager role  
INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (3, 2); -- User gets User role
*/
