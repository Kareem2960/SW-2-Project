# 🔐 TaskFlow Login Credentials - Updated

## 👥 **Users & Passwords**

| Username | Password | Role | Full Name | Status |
|----------|----------|------|-----------|--------|
| **admin** | **admin123** | Admin | System Administrator | ✅ Approved |
| **manager** | **admin123** | Manager | Project Manager | ✅ Approved |
| **user** | **admin123** | User | Regular User | ✅ Approved |

---

## 🎯 **Login Information**

### **👑 Admin Account**
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: 
  - Full system administration
  - Manage all users
  - Manage all projects
  - Manage all tasks
  - System settings

### **📋 Manager Account**
- **Username**: `manager`
- **Password**: `admin123`
- **Permissions**:
  - Create and manage projects
  - Assign tasks to team members
  - View project analytics
  - Manage project team members

### **👤 User Account**
- **Username**: `user`
- **Password**: `admin123`
- **Permissions**:
  - View assigned tasks
  - Update task status
  - Add comments to tasks
  - View own notifications

---

## 🌐 **How to Test**

### **Frontend Testing:**
1. Open: `http://localhost:5173`
2. Try each user account
3. Verify role-based access

### **API Testing:**
```bash
# Test Admin Login
curl -X POST http://localhost:18080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test Manager Login
curl -X POST http://localhost:18080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"manager","password":"admin123"}'

# Test User Login
curl -X POST http://localhost:18080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"admin123"}'
```

---

## 📱 **Frontend Access**

### **Application URL:**
- **Frontend**: `http://localhost:5173`
- **API Gateway**: `http://localhost:18080`
- **Swagger Docs**: `http://localhost:18080/swagger-ui.html`

### **Testing Steps:**
1. **Login as Admin** - Should see all features
2. **Login as Manager** - Should see project management features
3. **Login as User** - Should see limited features

---

## 🔄 **Database Status**

All users are stored in MySQL database:
- **Database**: `taskflow_auth`
- **Table**: `users`
- **Status**: All users approved and active

---

## 🎉 **Ready for Testing!**

The system now has 3 distinct user accounts with different roles and permissions. Each account can be used to test different aspects of the TaskFlow application.

**All services are running on Docker and ready for testing!** 🚀
