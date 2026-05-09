-- =====================================================
-- TaskFlow Database for SQL Server (SSMS)
-- Single Database with Service-Specific Tables
-- =====================================================

-- Create Main TaskFlow Database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskFlow')
BEGIN
    CREATE DATABASE TaskFlow;
END
GO

USE TaskFlow;
GO

-- =====================================================
-- Authentication Tables
-- =====================================================

-- Roles Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Roles' AND xtype='U')
BEGIN
    CREATE TABLE Roles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(255) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserName NVARCHAR(100) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        IsApproved BIT NOT NULL DEFAULT 0,
        FirstName NVARCHAR(100) NULL,
        LastName NVARCHAR(100) NULL,
        Age INT NULL,
        Email NVARCHAR(255) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL
    );
END
GO

-- User_Roles Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='User_Roles' AND xtype='U')
BEGIN
    CREATE TABLE User_Roles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        RoleId INT NOT NULL,
        AssignedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
        FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE
    );
END
GO

-- Role_Permissions Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Role_Permissions' AND xtype='U')
BEGIN
    CREATE TABLE Role_Permissions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        RoleId INT NOT NULL,
        Permission NVARCHAR(100) NOT NULL,
        Description NVARCHAR(255) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE
    );
END
GO

-- =====================================================
-- Project Management Tables
-- =====================================================

-- Projects Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Projects' AND xtype='U')
BEGIN
    CREATE TABLE Projects (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Active',
        StartDate DATETIME2 NULL,
        EndDate DATETIME2 NULL,
        Budget DECIMAL(18,2) NULL,
        CreatedBy INT NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL,
        FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
    );
END
GO

-- Project_Members Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Project_Members' AND xtype='U')
BEGIN
    CREATE TABLE Project_Members (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        ProjectId INT NOT NULL,
        UserId INT NOT NULL,
        Role NVARCHAR(50) NULL,
        JoinedAt DATETIME2 DEFAULT GETDATE(),
        IsActive BIT NOT NULL DEFAULT 1,
        FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE CASCADE,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END
GO

-- =====================================================
-- Task Management Tables
-- =====================================================

-- Tasks Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tasks' AND xtype='U')
BEGIN
    CREATE TABLE Tasks (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'To Do',
        Priority NVARCHAR(20) NOT NULL DEFAULT 'Medium',
        ProjectId INT NULL,
        AssignedUserId INT NULL,
        CreatedBy INT NULL,
        DueDate DATETIME2 NULL,
        EstimatedHours DECIMAL(5,2) NULL,
        ActualHours DECIMAL(5,2) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL,
        CompletedAt DATETIME2 NULL,
        FOREIGN KEY (ProjectId) REFERENCES Projects(Id) ON DELETE SET NULL,
        FOREIGN KEY (AssignedUserId) REFERENCES Users(Id) ON DELETE SET NULL,
        FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
    );
END
GO

-- Task_Comments Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Task_Comments' AND xtype='U')
BEGIN
    CREATE TABLE Task_Comments (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        TaskId INT NOT NULL,
        UserId INT NOT NULL,
        Comment NVARCHAR(MAX) NOT NULL,
        IsInternal BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (TaskId) REFERENCES Tasks(Id) ON DELETE CASCADE,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END
GO

-- Task_Attachments Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Task_Attachments' AND xtype='U')
BEGIN
    CREATE TABLE Task_Attachments (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        TaskId INT NOT NULL,
        FileName NVARCHAR(255) NOT NULL,
        OriginalFileName NVARCHAR(255) NULL,
        FilePath NVARCHAR(500) NOT NULL,
        FileSize BIGINT NULL,
        ContentType NVARCHAR(100) NULL,
        UploadedBy INT NULL,
        UploadedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (TaskId) REFERENCES Tasks(Id) ON DELETE CASCADE,
        FOREIGN KEY (UploadedBy) REFERENCES Users(Id)
    );
END
GO

-- Task_History Table (for tracking changes)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Task_History' AND xtype='U')
BEGIN
    CREATE TABLE Task_History (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        TaskId INT NOT NULL,
        ChangedBy INT NOT NULL,
        FieldName NVARCHAR(100) NOT NULL,
        OldValue NVARCHAR(MAX) NULL,
        NewValue NVARCHAR(MAX) NULL,
        ChangeType NVARCHAR(50) NOT NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        FOREIGN KEY (TaskId) REFERENCES Tasks(Id) ON DELETE CASCADE,
        FOREIGN KEY (ChangedBy) REFERENCES Users(Id)
    );
END
GO

-- =====================================================
-- Notification Tables
-- =====================================================

-- Notifications Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notifications' AND xtype='U')
BEGIN
    CREATE TABLE Notifications (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        Title NVARCHAR(255) NOT NULL,
        Message NVARCHAR(MAX) NOT NULL,
        Type NVARCHAR(50) NOT NULL,
        IsRead BIT NOT NULL DEFAULT 0,
        RelatedEntityId INT NULL,
        RelatedEntityType NVARCHAR(50) NULL,
        ActionUrl NVARCHAR(500) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        ReadAt DATETIME2 NULL,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END
GO

-- Notification_Preferences Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notification_Preferences' AND xtype='U')
BEGIN
    CREATE TABLE Notification_Preferences (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL UNIQUE,
        EmailNotifications BIT NOT NULL DEFAULT 1,
        PushNotifications BIT NOT NULL DEFAULT 1,
        TaskAssigned BIT NOT NULL DEFAULT 1,
        TaskCompleted BIT NOT NULL DEFAULT 1,
        ProjectUpdates BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL,
        FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
    );
END
GO

-- =====================================================
-- Insert Sample Data
-- =====================================================

-- Insert Roles
IF NOT EXISTS (SELECT * FROM Roles)
BEGIN
    INSERT INTO Roles (Name, Description) VALUES 
        ('Admin', 'System Administrator - Full access to all features'),
        ('Manager', 'Project Manager - Can manage projects and team members'),
        ('User', 'Standard User - Can work on assigned tasks');
END
GO

-- Insert Admin User
IF NOT EXISTS (SELECT * FROM Users WHERE UserName = 'admin')
BEGIN
    INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Age, Email, IsApproved) VALUES 
        ('admin', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'System', 'Administrator', 30, 'admin@taskflow.com', 1);
END
GO

-- Assign Admin Role to Admin User
IF NOT EXISTS (SELECT * FROM User_Roles WHERE UserId = 1 AND RoleId = 1)
BEGIN
    INSERT INTO User_Roles (UserId, RoleId) VALUES (1, 1);
END
GO

-- Insert Role Permissions
IF NOT EXISTS (SELECT * FROM Role_Permissions)
BEGIN
    -- Admin Permissions
    INSERT INTO Role_Permissions (RoleId, Permission, Description) VALUES 
        (1, 'users.manage', 'Can manage all users'),
        (1, 'roles.manage', 'Can manage roles and permissions'),
        (1, 'projects.manage', 'Can manage all projects'),
        (1, 'tasks.manage', 'Can manage all tasks'),
        (1, 'system.admin', 'Full system administration');
    
    -- Manager Permissions
    INSERT INTO Role_Permissions (RoleId, Permission, Description) VALUES 
        (2, 'projects.create', 'Can create new projects'),
        (2, 'projects.edit', 'Can edit project details'),
        (2, 'projects.delete', 'Can delete projects'),
        (2, 'tasks.assign', 'Can assign tasks to team members'),
        (2, 'tasks.view', 'Can view all project tasks'),
        (2, 'team.manage', 'Can manage project team members');
    
    -- User Permissions
    INSERT INTO Role_Permissions (RoleId, Permission, Description) VALUES 
        (3, 'tasks.view.assigned', 'Can view assigned tasks'),
        (3, 'tasks.update.assigned', 'Can update assigned tasks'),
        (3, 'tasks.comment', 'Can comment on tasks');
END
GO

-- Create Indexes for Performance
CREATE INDEX IX_Tasks_ProjectId ON Tasks(ProjectId);
CREATE INDEX IX_Tasks_AssignedUserId ON Tasks(AssignedUserId);
CREATE INDEX IX_Tasks_CreatedBy ON Tasks(CreatedBy);
CREATE INDEX IX_Project_Members_ProjectId ON Project_Members(ProjectId);
CREATE INDEX IX_Project_Members_UserId ON Project_Members(UserId);
CREATE INDEX IX_Notifications_UserId ON Notifications(UserId);
CREATE INDEX IX_Notifications_IsRead ON Notifications(IsRead);
CREATE INDEX IX_Task_Comments_TaskId ON Task_Comments(TaskId);
CREATE INDEX IX_Task_Attachments_TaskId ON Task_Attachments(TaskId);
GO

-- =====================================================
-- Views for Common Queries
-- =====================================================

-- User Details View
IF EXISTS (SELECT * FROM sys.views WHERE name = 'V_User_Details')
BEGIN
    DROP VIEW V_User_Details;
END
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
    STRING_AGG(r.Name, ', ') AS Roles
FROM Users u
LEFT JOIN User_Roles ur ON u.Id = ur.UserId
LEFT JOIN Roles r ON ur.RoleId = r.Id
GROUP BY u.Id, u.UserName, u.FirstName, u.LastName, u.Email, u.Age, u.IsApproved, u.CreatedAt;
GO

-- Project Details View
IF EXISTS (SELECT * FROM sys.views WHERE name = 'V_Project_Details')
BEGIN
    DROP VIEW V_Project_Details;
END
GO

CREATE VIEW V_Project_Details AS
SELECT 
    p.Id,
    p.Name,
    p.Description,
    p.Status,
    p.StartDate,
    p.EndDate,
    p.Budget,
    p.CreatedAt,
    cb.UserName AS CreatedByName,
    COUNT(pm.UserId) AS MemberCount,
    COUNT(t.Id) AS TaskCount
FROM Projects p
LEFT JOIN Users cb ON p.CreatedBy = cb.Id
LEFT JOIN Project_Members pm ON p.Id = pm.ProjectId AND pm.IsActive = 1
LEFT JOIN Tasks t ON p.Id = t.ProjectId
GROUP BY p.Id, p.Name, p.Description, p.Status, p.StartDate, p.EndDate, p.Budget, p.CreatedAt, cb.UserName;
GO

-- =====================================================
-- Stored Procedures
-- =====================================================

-- Get User Permissions
IF EXISTS (SELECT * FROM sys.objects WHERE name = 'SP_GetUserPermissions' AND type = 'P')
BEGIN
    DROP PROCEDURE SP_GetUserPermissions;
END
GO

CREATE PROCEDURE SP_GetUserPermissions
    @UserId INT
AS
BEGIN
    SELECT DISTINCT rp.Permission, rp.Description
    FROM User_Roles ur
    JOIN Role_Permissions rp ON ur.RoleId = rp.RoleId
    WHERE ur.UserId = @UserId;
END
GO

-- Get Project Tasks
IF EXISTS (SELECT * FROM sys.objects WHERE name = 'SP_GetProjectTasks' AND type = 'P')
BEGIN
    DROP PROCEDURE SP_GetProjectTasks;
END
GO

CREATE PROCEDURE SP_GetProjectTasks
    @ProjectId INT,
    @UserId INT = NULL
AS
BEGIN
    SELECT 
        t.Id,
        t.Title,
        t.Description,
        t.Status,
        t.Priority,
        t.DueDate,
        t.CreatedAt,
        t.AssignedUserId,
        au.UserName AS AssignedUserName,
        au.FirstName + ' ' + au.LastName AS AssignedUserFullName,
        cb.UserName AS CreatedByName
    FROM Tasks t
    LEFT JOIN Users au ON t.AssignedUserId = au.Id
    LEFT JOIN Users cb ON t.CreatedBy = cb.Id
    WHERE t.ProjectId = @ProjectId
    AND (@UserId IS NULL OR t.AssignedUserId = @UserId OR t.CreatedBy = @UserId)
    ORDER BY t.CreatedAt DESC;
END
GO

-- =====================================================
-- How to Use This Script
-- =====================================================

/*
Instructions:

1. Open SQL Server Management Studio (SSMS)
2. Connect to your SQL Server instance
3. Open New Query window
4. Copy and paste this entire script
5. Execute (F5)

What This Creates:
- Single Database: TaskFlow
- All tables for all services
- Sample data (admin user, roles, permissions)
- Indexes for performance
- Views for common queries
- Stored procedures for business logic

Connection Info:
- Server: (local) or your server name
- Database: TaskFlow (will be created)
- Authentication: Windows or SQL Server Auth

Default Login:
- Username: admin
- Password: admin123

After Setup:
1. Update Spring Boot connection strings to point to this database
2. All microservices will connect to the same TaskFlow database
3. Test the application

Tables by Service:
├── Auth Service: Users, Roles, User_Roles, Role_Permissions
├── Project Service: Projects, Project_Members  
├── Task Service: Tasks, Task_Comments, Task_Attachments, Task_History
└── Notification Service: Notifications, Notification_Preferences

All services share one database but work with their specific tables.
*/
