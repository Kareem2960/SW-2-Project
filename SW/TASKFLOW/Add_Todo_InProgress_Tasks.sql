-- =====================================================
-- Add Tasks with Todo and In-Progress Status for Member Dashboard
-- =====================================================

USE TaskFlow_Task;
GO

-- Add TODO tasks
IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Design system architecture')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Design system architecture', 'Design the overall system architecture', 1, 3, 'todo', 'high', GETDATE());
    PRINT 'Task "Design system architecture" created with todo status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Create database schema')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Create database schema', 'Design and implement database schema', 1, 3, 'todo', 'high', GETDATE());
    PRINT 'Task "Create database schema" created with todo status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Implement user authentication')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Implement user authentication', 'Implement secure user authentication', 2, 3, 'todo', 'high', GETDATE());
    PRINT 'Task "Implement user authentication" created with todo status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Design mobile app UI')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Design mobile app UI', 'Design user interface for mobile application', 2, 3, 'todo', 'medium', GETDATE());
    PRINT 'Task "Design mobile app UI" created with todo status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Set up monitoring system')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Set up monitoring system', 'Implement system monitoring and alerts', 4, 3, 'todo', 'medium', GETDATE());
    PRINT 'Task "Set up monitoring system" created with todo status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Write API documentation')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Write API documentation', 'Document all API endpoints', 3, 3, 'todo', 'medium', GETDATE());
    PRINT 'Task "Write API documentation" created with todo status';
END
GO

-- Add IN-PROGRESS tasks
IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Develop frontend components')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Develop frontend components', 'Build reusable frontend components', 1, 3, 'in-progress', 'high', GETDATE());
    PRINT 'Task "Develop frontend components" created with in-progress status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Implement REST API')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Implement REST API', 'Develop RESTful API endpoints', 1, 3, 'in-progress', 'high', GETDATE());
    PRINT 'Task "Implement REST API" created with in-progress status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Test mobile application')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Test mobile application', 'Perform comprehensive testing of mobile app', 2, 3, 'in-progress', 'high', GETDATE());
    PRINT 'Task "Test mobile application" created with in-progress status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Optimize database queries')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Optimize database queries', 'Improve database query performance', 3, 3, 'in-progress', 'medium', GETDATE());
    PRINT 'Task "Optimize database queries" created with in-progress status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Configure load balancer')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Configure load balancer', 'Set up load balancing for high availability', 4, 3, 'in-progress', 'high', GETDATE());
    PRINT 'Task "Configure load balancer" created with in-progress status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Implement caching layer')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Implement caching layer', 'Add Redis caching for improved performance', 4, 3, 'in-progress', 'medium', GETDATE());
    PRINT 'Task "Implement caching layer" created with in-progress status';
END
GO

-- Display task distribution
PRINT '';
PRINT '=== Task Distribution Summary ===';
PRINT '';

SELECT 
    status,
    COUNT(id) AS TaskCount
FROM tasks
WHERE assigned_user_id = 3
GROUP BY status
ORDER BY status;
GO

PRINT '';
PRINT '=== Tasks Added Successfully ===';
