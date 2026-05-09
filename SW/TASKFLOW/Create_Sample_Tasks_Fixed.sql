-- =====================================================
-- Create Sample Tasks for TaskFlow
-- Assign tasks to test users for demonstration
-- =====================================================

USE TaskFlow_Task;
GO

-- Insert Sample Tasks for User (ID: 39 - kmakemo)
INSERT INTO tasks (title, description, status, priority, due_date, project_id, assigned_user_id, created_at) VALUES 
('Complete Project Documentation', 'Write comprehensive documentation for the new project features', 'TODO', 'MEDIUM', DATEADD(day, 7, GETDATE()), 1, 39, GETDATE()),
('Review Code Changes', 'Review and approve pending pull requests from team members', 'IN_PROGRESS', 'HIGH', DATEADD(day, 2, GETDATE()), 1, 39, GETDATE()),
('Update User Interface', 'Implement the new design mockups for the dashboard', 'TODO', 'LOW', DATEADD(day, 14, GETDATE()), 2, 39, GETDATE()),
('Fix Bug in Authentication', 'Resolve the login issue reported by QA team', 'IN_PROGRESS', 'HIGH', DATEADD(day, 1, GETDATE()), 1, 39, GETDATE()),
('Prepare Weekly Report', 'Compile and send the weekly progress report to management', 'TODO', 'MEDIUM', DATEADD(day, 3, GETDATE()), 2, 39, GETDATE());

PRINT 'Sample tasks created successfully for user kmakemo (ID: 39)!';
PRINT 'User now has 5 tasks assigned';
PRINT '';
PRINT 'Task Status Distribution:';
PRINT '- TODO: 3 tasks';
PRINT '- IN_PROGRESS: 2 tasks';
PRINT '';
PRINT 'Priority Distribution:';
PRINT '- HIGH: 2 tasks';
PRINT '- MEDIUM: 2 tasks';
PRINT '- LOW: 1 task';
