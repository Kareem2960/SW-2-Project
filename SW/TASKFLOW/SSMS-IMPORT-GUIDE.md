# 🗄️ Import TaskFlow Data into SQL Server (SSMS)

## 📋 **Files Created for You:**

### **1. MySQL Export File:**
- **File**: `taskflow_full_export.sql`
- **Format**: MySQL dump format
- **Use**: For MySQL Workbench or DBeaver

### **2. SQL Server File:**
- **File**: `taskflow_for_ssms.sql`
- **Format**: SQL Server syntax
- **Use**: **For SSMS directly** ⭐

---

## 🎯 **Quick Steps for SSMS:**

### **Method 1: Use the Ready SQL Server File** ⭐ (Recommended)
```sql
1. Open SSMS
2. Connect to your SQL Server instance
3. File → Open → File → taskflow_for_ssms.sql
4. Press F5 (Execute)
5. Done! ✅
```

### **Method 2: Copy & Paste**
1. Open `taskflow_for_ssms.sql` in Notepad
2. Copy all content (Ctrl+A)
3. Open SSMS → New Query
4. Paste (Ctrl+V)
5. Execute (F5)

---

## 🗂️ **What Will Be Created:**

### **Databases:**
- ✅ `TaskFlow_Auth` - Users & Roles
- ✅ `TaskFlow_Project` - Projects
- ✅ `TaskFlow_Task` - Tasks
- ✅ `TaskFlow_Notification` - Notifications

### **Tables:**
```
TaskFlow_Auth:
├── Users (Id, UserName, PasswordHash, IsApproved, etc.)
├── Roles (Id, Name, Description)
├── User_Roles (UserId, RoleId)
└── Role_Permissions (RoleId, Permission)

TaskFlow_Project:
├── Projects (Id, Name, Description, Status)
└── Project_Members (ProjectId, UserId, Role)

TaskFlow_Task:
├── Tasks (Id, Title, Description, Status, Priority)
├── Task_Comments (TaskId, UserId, Comment)
└── Task_Attachments (TaskId, FileName, FilePath)

TaskFlow_Notification:
└── Notifications (Id, UserId, Title, Message, IsRead)
```

---

## 🔐 **Login Credentials After Import:**

### **Default Admin User:**
- **Username**: `admin`
- **Password**: `admin123`
- **Database**: TaskFlow_Auth
- **Role**: Admin

---

## 🌐 **Connection Details for SSMS:**

### **Server Info:**
- **Server Name**: `(local)` or `.` or your server name
- **Authentication**: Windows Authentication or SQL Server Auth
- **Databases**: Will be created automatically

---

## 🔧 **After Import - Next Steps:**

### **Option 1: Use with SQL Server Directly**
1. Update Spring Boot connection strings:
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=TaskFlow_Auth
spring.datasource.username=sa
spring.datasource.password=your_password
```

### **Option 2: Keep MySQL + View Data in SSMS**
1. Install MySQL ODBC driver
2. Create linked server in SSMS
3. Access MySQL data from SSMS

---

## 🔄 **Data Conversion Notes:**

### **MySQL → SQL Server Conversions:**
| MySQL Type | SQL Server Type | Example |
|-------------|------------------|----------|
| VARCHAR(255) | NVARCHAR(255) | Name fields |
| TEXT | NVARCHAR(MAX) | Description fields |
| BOOLEAN | BIT | IsApproved |
| DATETIME | DATETIME2 | Timestamps |
| AUTO_INCREMENT | IDENTITY(1,1) | Primary keys |
| TINYINT(1) | BIT | Boolean flags |

---

## 🎉 **Success Indicators:**

### **After Successful Import:**
- ✅ 4 databases created
- ✅ All tables created successfully
- ✅ Admin user inserted
- ✅ Default roles created
- ✅ Ready for application connection

### **Test Connection:**
```sql
-- Test Users table
USE TaskFlow_Auth;
SELECT * FROM Users;

-- Should show admin user with encrypted password
```

---

## 🛠️ **Troubleshooting:**

### **Common Issues:**
1. **Permission Denied**: Run SSMS as Administrator
2. **SQL Syntax Error**: Make sure to select correct database
3. **Connection Failed**: Check SQL Server service is running

### **Solutions:**
```sql
-- Check if databases exist
SELECT name FROM sys.databases WHERE name LIKE 'TaskFlow_%';

-- Check if tables exist
SELECT name FROM sys.tables WHERE name IN ('Users', 'Roles', 'Projects', 'Tasks');
```

---

## 📞 **Need Help?**

### **Files Available:**
- ✅ `taskflow_for_ssms.sql` - Ready for SSMS
- ✅ `taskflow_full_export.sql` - MySQL export
- ✅ `SSMS-IMPORT-GUIDE.md` - This guide

### **Next Steps:**
1. ✅ Data exported and converted
2. 🔄 Import into SSMS
3. 🌐 Update application connection strings
4. 🚀 Test with SQL Server

**Your TaskFlow data is now ready for SQL Server!** 🎊
