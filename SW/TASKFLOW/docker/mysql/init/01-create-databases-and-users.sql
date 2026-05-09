-- Create one schema + one user per service (principle of least privilege).
-- Safe to re-run (uses IF NOT EXISTS where possible).

CREATE DATABASE IF NOT EXISTS taskflow_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'taskflow_auth_user'@'%' IDENTIFIED BY 'taskflow_auth_password';
GRANT ALL PRIVILEGES ON taskflow_auth.* TO 'taskflow_auth_user'@'%';

CREATE DATABASE IF NOT EXISTS taskflow_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'taskflow_project_user'@'%' IDENTIFIED BY 'taskflow_project_password';
GRANT ALL PRIVILEGES ON taskflow_project.* TO 'taskflow_project_user'@'%';

CREATE DATABASE IF NOT EXISTS taskflow_task CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'taskflow_task_user'@'%' IDENTIFIED BY 'taskflow_task_password';
GRANT ALL PRIVILEGES ON taskflow_task.* TO 'taskflow_task_user'@'%';

CREATE DATABASE IF NOT EXISTS taskflow_notification CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'taskflow_notification_user'@'%' IDENTIFIED BY 'taskflow_notification_password';
GRANT ALL PRIVILEGES ON taskflow_notification.* TO 'taskflow_notification_user'@'%';

FLUSH PRIVILEGES;

