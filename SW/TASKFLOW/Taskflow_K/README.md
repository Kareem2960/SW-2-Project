
---

# TaskFlow - Project Management System

**TaskFlow** is a project management system designed to help teams organize tasks, assign work, and track project progress efficiently.

---

## **Overview**

TaskFlow allows teams to manage projects by organizing tasks, assigning work, and monitoring progress. Each user has a specific role in the system:

* **Admin**: Manages the whole system, approves new accounts, and monitors projects and users.
* **Project Manager**: Manages individual projects, creates tasks, assigns them to team members, and tracks progress.
* **Team Member**: Executes assigned tasks, updates their status, adds comments, and uploads related files.

---

## **Roles Summary**

* **Admin**: Login/logout, manage Project Manager accounts, view all projects and users, and see basic system statistics.
* **Project Manager**: Create projects and tasks, assign tasks, track progress, approve completed tasks, and view project statistics.
* **Team Member**: Receive assigned tasks, update status (To Do → In Progress → Done), add comments, upload files, and receive notifications.

---

## **Project & Task Structure**

**Project**

* Name, Description, Manager, Created At
* Contains multiple tasks
* Can have multiple members

**Task**

* Title, Description, Assigned Member, Priority (High/Medium/Low), Due Date, Status (To Do / In Progress / Done)
* Can include comments and attachments

**Workflow**

* Tasks move through stages: To Do → In Progress → Done

---

## **Key Requirements**

* Different actors can log in and log out
* Admin can approve/reject Project Manager accounts
* Project Manager can create/manage projects and tasks
* Team Members can update tasks, add comments, upload files
* Notifications sent in real-time when tasks are assigned or updated

---

## **Database Schema (Example)**

* **Users**: id, name, email, role, password, status
* **Projects**: id, name, description, manager_id, created_at
* **Tasks**: id, project_id, title, description, assigned_member_id, priority, due_date, status
* **Comments**: id, task_id, member_id, comment_text, created_at
* **Files**: id, task_id, member_id, file_path, created_at
* **Notifications**: id, user_id, type, message, read_status, created_at

---

## **Tech Stack**

* **Front-End**: HTML, CSS, JavaScript, React/Vue
* **Back-End**: Node.js / PHP / Python
* **Database**: MySQL / PostgreSQL / MongoDB
* **Real-Time Notifications**: WebSockets / Socket.IO

---

## **How to Run**

1. Clone the repository:

```bash
git clone https://github.com/malakhassan12/Taskflow_frontend.git
```

2. Install dependencies
3. Start the development server

---

