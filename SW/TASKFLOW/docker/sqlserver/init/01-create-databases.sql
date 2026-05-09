-- Create databases for TaskFlow services
-- This script runs when SQL Server container starts

-- Create TaskFlow database for Auth Service
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TaskFlow')
BEGIN
    CREATE DATABASE TaskFlow;
    PRINT 'TaskFlow database created for Auth Service';
END

-- Create TaskFlow_Project database for Project Service
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TaskFlow_Project')
BEGIN
    CREATE DATABASE TaskFlow_Project;
    PRINT 'TaskFlow_Project database created for Project Service';
END

-- Create TaskFlow_Task database for Task Service
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TaskFlow_Task')
BEGIN
    CREATE DATABASE TaskFlow_Task;
    PRINT 'TaskFlow_Task database created for Task Service';
END

-- Create TaskFlow_Notification database for Notification Service
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TaskFlow_Notification')
BEGIN
    CREATE DATABASE TaskFlow_Notification;
    PRINT 'TaskFlow_Notification database created for Notification Service';
END

PRINT 'All TaskFlow databases created successfully';
