# SignalR Real-Time Examples

This guide provides examples of how to use SignalR for real-time communication in TaskFlow.

## Current SignalR Service

The project already has a SignalR service at `src/services/signalrService.js`:

```javascript
import * as signalR from '@microsoft/signalr';

let connection = null;

export const createSignalRConnection = async (token) => {
  if (connection) {
    return connection;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5150/notifications', {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
};

export const getSignalRConnection = () => connection;

export const onReceiveNotification = (callback) => {
  if (connection) {
    connection.on('ReceiveNotification', callback);
  }
};

export const stopSignalRConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};
```

## Example 1: Basic Notification Listener

This is the current implementation in `MemberDashboardContent.jsx`:

```javascript
import { createSignalRConnection, onReceiveNotification } from "../../../services/signalrService";
import { useNotifications } from "../../../Context/NotificationsProvider";

const MyComponent = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await createSignalRConnection(token);
          
          // Listen for notifications from server
          onReceiveNotification((message) => {
            addNotification({
              id: `${Date.now()}`,
              type: "updated",
              title: "New Notification",
              message: message,
              createdAt: Date.now(),
            });
          });
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();
  }, [addNotification]);

  return <div>My Component</div>;
};
```

## Example 2: Real-Time Task Updates

Add this to your SignalR service for task updates:

```javascript
// Add to signalrService.js
export const onTaskUpdated = (callback) => {
  if (connection) {
    connection.on('TaskUpdated', callback);
  }
};

export const onTaskAssigned = (callback) => {
  if (connection) {
    connection.on('TaskAssigned', callback);
  }
};

export const onTaskDeleted = (callback) => {
  if (connection) {
    connection.on('TaskDeleted', callback);
  }
};
```

Usage in component:

```javascript
import { 
  createSignalRConnection, 
  onTaskUpdated, 
  onTaskAssigned,
  onTaskDeleted 
} from "../../../services/signalrService";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await createSignalRConnection(token);
          
          // Listen for task updates
          onTaskUpdated((updatedTask) => {
            setTasks(prev => prev.map(t => 
              t.id === updatedTask.id ? updatedTask : t
            ));
          });

          // Listen for new task assignments
          onTaskAssigned((newTask) => {
            setTasks(prev => [...prev, newTask]);
          });

          // Listen for task deletions
          onTaskDeleted((taskId) => {
            setTasks(prev => prev.filter(t => t.id !== taskId));
          });
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();
  }, []);

  return <div>Task Board</div>;
};
```

## Example 3: Real-Time Chat/Comments

Add to SignalR service:

```javascript
export const onNewComment = (callback) => {
  if (connection) {
    connection.on('NewComment', callback);
  }
};

export const sendComment = async (taskId, comment) => {
  if (connection) {
    await connection.invoke('SendComment', taskId, comment);
  }
};
```

Usage in component:

```javascript
import { 
  createSignalRConnection, 
  onNewComment, 
  sendComment 
} from "../../../services/signalrService";

const CommentsSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await createSignalRConnection(token);
          
          // Listen for new comments
          onNewComment((comment) => {
            setComments(prev => [...prev, comment]);
          });
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();
  }, []);

  const handleSendComment = async () => {
    if (newComment.trim()) {
      await sendComment(taskId, newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      <div>
        {comments.map(comment => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </div>
      <input 
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleSendComment}>Send</button>
    </div>
  );
};
```

## Example 4: Real-Time User Presence

Add to SignalR service:

```javascript
export const onUserOnline = (callback) => {
  if (connection) {
    connection.on('UserOnline', callback);
  }
};

export const onUserOffline = (callback) => {
  if (connection) {
    connection.on('UserOffline', callback);
  }
};
```

Usage:

```javascript
import { 
  createSignalRConnection, 
  onUserOnline, 
  onUserOffline 
} from "../../../services/signalrService";

const TeamMembers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await createSignalRConnection(token);
          
          onUserOnline((user) => {
            setOnlineUsers(prev => [...prev, user]);
          });

          onUserOffline((userId) => {
            setOnlineUsers(prev => prev.filter(u => u.id !== userId));
          });
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();
  }, []);

  return (
    <div>
      <h3>Online Team Members</h3>
      {onlineUsers.map(user => (
        <div key={user.id}>{user.name} - Online</div>
      ))}
    </div>
  );
};
```

## Example 5: Cleanup on Unmount

Always cleanup SignalR connections when component unmounts:

```javascript
import { createSignalRConnection, stopSignalRConnection } from "../../../services/signalrService";

const MyComponent = () => {
  useEffect(() => {
    const setupSignalR = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await createSignalRConnection(token);
        }
      } catch (error) {
        console.error("SignalR connection error:", error);
      }
    };

    setupSignalR();

    // Cleanup on unmount
    return () => {
      stopSignalRConnection();
    };
  }, []);

  return <div>My Component</div>;
};
```

## Backend Hub Example (C#)

The backend NotificationHub is already set up. Here's an example of how to extend it:

```csharp
using Microsoft.AspNetCore.SignalR;

namespace TASKFLOW.HUB
{
    public class NotificationHub : Hub
    {
        // Existing notification method
        public async Task SendNotification(string userId, string message)
        {
            await Clients.Group(userId).SendAsync("ReceiveNotification", message);
        }

        // Add task update method
        public async Task SendTaskUpdate(object taskData)
        {
            await Clients.All.SendAsync("TaskUpdated", taskData);
        }

        // Add comment method
        public async Task SendComment(int taskId, string comment)
        {
            await Clients.Group($"task-{taskId}").SendAsync("NewComment", comment);
        }

        // User presence methods
        public async Task JoinUserGroup(string userId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"user-{userId}");
            await Clients.Others.SendAsync("UserOnline", new { userId, connectionId = Context.ConnectionId });
        }

        public async Task LeaveUserGroup(string userId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user-{userId}");
            await Clients.Others.SendAsync("UserOffline", userId);
        }
    }
}
```

## Best Practices

1. **Always cleanup connections** - Stop SignalR when component unmounts
2. **Handle connection errors** - Implement retry logic with automatic reconnection
3. **Use groups** - Group users by team, project, or task for targeted updates
4. **Debounce rapid updates** - For high-frequency updates, consider debouncing
5. **Secure with tokens** - Always use JWT tokens for authentication
6. **Test reconnection** - Test what happens when connection drops and reconnects
