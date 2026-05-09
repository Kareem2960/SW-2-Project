-- =====================================================
-- Fix Task Statuses to Match Frontend Expectations
-- Frontend maps: done/completed/closed -> completed
--                inprogress/IN_PROGRESS -> in-progress  
--                everything else -> pending (To Do)
-- =====================================================

USE TaskFlow_Task;
GO

-- Update 'todo' status to 'pending' (which maps to To Do section)
UPDATE tasks SET status = 'pending' WHERE status = 'todo';
PRINT 'Updated todo tasks to pending';
GO

-- Update 'in-progress' to 'IN_PROGRESS' (which maps to in-progress section)
UPDATE tasks SET status = 'IN_PROGRESS' WHERE status = 'in-progress';
PRINT 'Updated in-progress tasks to IN_PROGRESS';
GO

-- Update 'completed' to 'DONE' (which maps to completed section)
UPDATE tasks SET status = 'DONE' WHERE status = 'completed';
PRINT 'Updated completed tasks to DONE';
GO

-- Display task distribution
PRINT '';
PRINT '=== Updated Task Distribution ===';
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
PRINT '=== Task Statuses Fixed Successfully ===';
