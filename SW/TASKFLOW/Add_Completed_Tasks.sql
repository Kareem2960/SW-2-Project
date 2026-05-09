-- =====================================================
-- Add Tasks with Completed Status for Member View
-- =====================================================

USE TaskFlow_Task;
GO

-- Update existing tasks to completed status
IF EXISTS (SELECT * FROM tasks WHERE title = 'Create wireframes and mockups' AND status != 'completed')
BEGIN
    UPDATE tasks SET status = 'completed' WHERE title = 'Create wireframes and mockups';
    PRINT 'Task "Create wireframes and mockups" updated to completed';
END
GO

IF EXISTS (SELECT * FROM tasks WHERE title = 'Implement responsive design' AND status != 'completed')
BEGIN
    UPDATE tasks SET status = 'completed' WHERE title = 'Implement responsive design';
    PRINT 'Task "Implement responsive design" updated to completed';
END
GO

IF EXISTS (SELECT * FROM tasks WHERE title = 'Develop user authentication' AND status != 'completed')
BEGIN
    UPDATE tasks SET status = 'completed' WHERE title = 'Develop user authentication';
    PRINT 'Task "Develop user authentication" updated to completed';
END
GO

-- Add new completed tasks
IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Complete UI design review')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Complete UI design review', 'Final review and approval of all UI designs', 1, 3, 'completed', 'high', GETDATE());
    PRINT 'Task "Complete UI design review" created with completed status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Deploy staging environment')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Deploy staging environment', 'Deploy application to staging environment for testing', 2, 3, 'completed', 'high', GETDATE());
    PRINT 'Task "Deploy staging environment" created with completed status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Database schema optimization')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Database schema optimization', 'Optimize database schema for better performance', 3, 3, 'completed', 'medium', GETDATE());
    PRINT 'Task "Database schema optimization" created with completed status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Security audit completion')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Security audit completion', 'Complete security audit and fix vulnerabilities', 4, 3, 'completed', 'high', GETDATE());
    PRINT 'Task "Security audit completion" created with completed status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Documentation finalization')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Documentation finalization', 'Complete all project documentation and user guides', 1, 3, 'completed', 'medium', GETDATE());
    PRINT 'Task "Documentation finalization" created with completed status';
END
GO

-- Add tasks for the 4th project
IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Set up AWS environment')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Set up AWS environment', 'Configure AWS account and VPC for the application', 4, 3, 'completed', 'high', GETDATE());
    PRINT 'Task "Set up AWS environment" created with completed status';
END
GO

IF NOT EXISTS (SELECT * FROM tasks WHERE title = 'Configure CI/CD pipeline')
BEGIN
    INSERT INTO tasks (title, description, project_id, assigned_user_id, status, priority, created_at) VALUES 
        ('Configure CI/CD pipeline', 'Set up automated deployment pipeline using GitHub Actions', 4, 3, 'completed', 'high', GETDATE());
    PRINT 'Task "Configure CI/CD pipeline" created with completed status';
END
GO

-- Display completed tasks count
PRINT '';
PRINT '=== Completed Tasks Summary ===';
PRINT '';

SELECT 
    project_id,
    COUNT(id) AS CompletedTaskCount
FROM tasks
WHERE status = 'completed' AND assigned_user_id = 3
GROUP BY project_id
ORDER BY project_id;
GO

PRINT '';
PRINT '=== Completed Tasks Added Successfully ===';
