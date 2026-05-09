-- =====================================================
-- Create Sample Tasks for TaskFlow
-- Assign tasks to test users for demonstration
-- =====================================================

USE taskflow_task;
GO

-- Insert Sample Tasks for User (ID: 3)
INSERT IGNORE INTO tasks (title, description, status, priority, due_date, project_id, assigned_user_id, created_by, created_at) VALUES 
('Complete Project Documentation', 'Write comprehensive documentation for the new project features', 'TODO', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), 1, 3, 2, NOW()),
('Review Code Changes', 'Review and approve pending pull requests from team members', 'IN_PROGRESS', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 2 DAY), 1, 3, 2, NOW()),
('Update User Interface', 'Implement the new design mockups for the dashboard', 'TODO', 'LOW', DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY), 2, 3, 2, NOW()),
('Fix Bug in Authentication', 'Resolve the login issue reported by QA team', 'IN_PROGRESS', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY), 1, 3, 2, NOW()),
('Prepare Weekly Report', 'Compile and send the weekly progress report to management', 'TODO', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY), 2, 3, 2, NOW());

-- Insert Sample Tasks for Manager (ID: 2)
INSERT IGNORE INTO tasks (title, description, status, priority, due_date, project_id, assigned_user_id, created_by, created_at) VALUES 
('Review Team Performance', 'Evaluate team member performance for this quarter', 'IN_PROGRESS', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY), 1, 2, 1, NOW()),
('Plan Next Sprint', 'Create sprint plan and assign tasks to team members', 'TODO', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 2 DAY), 1, 2, 1, NOW()),
('Client Meeting Preparation', 'Prepare presentation materials for client meeting', 'TODO', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY), 2, 2, 1, NOW()),
('Budget Review', 'Review and approve project budget allocations', 'DONE', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY), 1, 2, 1, NOW()),
('Hiring New Developer', 'Screen and interview candidates for developer position', 'IN_PROGRESS', 'LOW', DATE_ADD(CURRENT_DATE, INTERVAL 10 DAY), 2, 2, 1, NOW());

-- Insert Sample Tasks for Admin (ID: 1)
INSERT IGNORE INTO tasks (title, description, status, priority, due_date, project_id, assigned_user_id, created_by, created_at) VALUES 
('System Maintenance', 'Perform scheduled maintenance on production servers', 'TODO', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY), 1, 1, 1, NOW()),
('Security Audit', 'Conduct quarterly security audit of all systems', 'IN_PROGRESS', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), 1, 1, 1, NOW()),
('Database Backup', 'Verify and test database backup procedures', 'DONE', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL -2 DAY), 1, 1, 1, NOW()),
('Update Documentation', 'Update system documentation with latest changes', 'TODO', 'LOW', DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY), 2, 1, 1, NOW()),
('Monitor System Performance', 'Review system performance metrics and logs', 'IN_PROGRESS', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY), 1, 1, 1, NOW());

PRINT 'Sample tasks created successfully!';
PRINT 'User (ID: 3) now has 5 tasks assigned';
PRINT 'Manager (ID: 2) now has 5 tasks assigned';
PRINT 'Admin (ID: 1) now has 5 tasks assigned';
PRINT '';
PRINT 'Task Status Distribution:';
PRINT '- TODO: 8 tasks';
PRINT '- IN_PROGRESS: 7 tasks';
PRINT '- DONE: 2 tasks';
PRINT '';
PRINT 'Priority Distribution:';
PRINT '- HIGH: 8 tasks';
PRINT '- MEDIUM: 5 tasks';
PRINT '- LOW: 4 tasks';
