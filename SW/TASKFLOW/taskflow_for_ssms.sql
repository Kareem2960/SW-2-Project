-- =====================================================
-- TaskFlow Database Export for SQL Server (SSMS)
-- Converted from MySQL to SQL Server syntax
-- =====================================================

-- Create Databases
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskFlow_Auth')
BEGIN
    CREATE DATABASE TaskFlow_Auth;
END
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskFlow_Project')
BEGIN
    CREATE DATABASE TaskFlow_Project;
END
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskFlow_Task')
BEGIN
    CREATE DATABASE TaskFlow_Task;
END
GO

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskFlow_Notification')
BEGIN
    CREATE DATABASE TaskFlow_Notification;
END
GO

-- =====================================================
-- TaskFlow_Auth Database Tables
-- =====================================================
USE TaskFlow_Auth;
GO

-- Roles Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Roles' AND xtype='U')
BEGIN
    CREATE TABLE Roles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(255) NULL
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
        CreatedAt DATETIME2 DEFAULT GETDATE()
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
        FOREIGN KEY (UserId) REFERENCES Users(Id),
        FOREIGN KEY (RoleId) REFERENCES Roles(Id)
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
        FOREIGN KEY (RoleId) REFERENCES Roles(Id)
    );
END
GO

-- =====================================================
-- TaskFlow_Project Database Tables
-- =====================================================
USE TaskFlow_Project;
GO

-- Projects Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Projects' AND xtype='U')
BEGIN
    CREATE TABLE Projects (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Active',
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL
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
        FOREIGN KEY (ProjectId) REFERENCES Projects(Id)
    );
END
GO

-- =====================================================
-- TaskFlow_Task Database Tables
-- =====================================================
USE TaskFlow_Task;
GO

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
        DueDate DATETIME2 NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE(),
        UpdatedAt DATETIME2 NULL
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
        CreatedAt DATETIME2 DEFAULT GETDATE()
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
        FilePath NVARCHAR(500) NOT NULL,
        FileSize BIGINT NULL,
        ContentType NVARCHAR(100) NULL,
        UploadedAt DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- =====================================================
-- TaskFlow_Notification Database Tables
-- =====================================================
USE TaskFlow_Notification;
GO

-- Notifications Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notifications' AND xtype='U')
BEGIN
    CREATE TABLE Notifications (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UserId INT NOT NULL,
        Title NVARCHAR(255) NOT NULL,
        Message NVARCHAR(MAX) NOT NULL,
        IsRead BIT NOT NULL DEFAULT 0,
        Type NVARCHAR(50) NULL,
        CreatedAt DATETIME2 DEFAULT GETDATE()
    );
END
GO

-- =====================================================
-- Insert Sample Data
-- =====================================================

-- Insert Roles
USE TaskFlow_Auth;
GO

IF NOT EXISTS (SELECT * FROM Roles)
BEGIN
    INSERT INTO Roles (Name, Description) VALUES 
        ('Admin', 'System Administrator'),
        ('User', 'Standard User'),
        ('Manager', 'Project Manager');
END
GO

-- Insert Admin User
IF NOT EXISTS (SELECT * FROM Users WHERE UserName = 'admin')
BEGIN
    INSERT INTO Users (UserName, PasswordHash, FirstName, LastName, Age, IsApproved) VALUES 
        ('admin', '$2a$10$KipgvxxdcDqvc.yMIaHIWOBzlCacOG7gO.XTNS1/.xpGrBsYRvp0S', 'System', 'Administrator', 30, 1);
END
GO

-- Assign Admin Role to Admin User
IF NOT EXISTS (SELECT * FROM User_Roles WHERE UserId = 1 AND RoleId = 1)
BEGIN
    INSERT INTO User_Roles (UserId, RoleId) VALUES (1, 1);
END
GO

-- =====================================================
-- How to Use This File in SSMS
-- =====================================================

/*
Steps to import this data into SQL Server Management Studio (SSMS):

1. Open SSMS and connect to your SQL Server instance
2. Open a New Query window
3. Copy and paste this entire script
4. Execute the script (F5 or press Execute button)
5. The script will:
   - Create 4 databases: TaskFlow_Auth, TaskFlow_Project, TaskFlow_Task, TaskFlow_Notification
   - Create all necessary tables with proper relationships
   - Insert sample data (Admin user and roles)

Connection Information:
- Server: (local) or your server name
- Authentication: Windows Authentication or SQL Server Authentication
- Databases will be created automatically

Default Login Credentials:
- Username: admin
- Password: admin123

After Import:
1. You can connect your frontend to SQL Server instead of MySQL
2. Update connection strings in your Spring Boot services
3. Test the application with SQL Server database

Note: This script converts MySQL data types to SQL Server equivalents:
- MySQL INT → SQL Server INT
- MySQL VARCHAR → SQL Server NVARCHAR
- MySQL TEXT → SQL Server NVARCHAR(MAX)
- MySQL BOOLEAN → SQL Server BIT
- MySQL DATETIME → SQL Server DATETIME2
- MySQL AUTO_INCREMENT → SQL Server IDENTITY(1,1)
*/
