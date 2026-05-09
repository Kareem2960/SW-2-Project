import { useState, useEffect } from "react";
// ==================== Ant Design   ====================

import {
  Modal,
  Card,
  Input,
  Button,
  Avatar,
  Space,
  Badge,
  Tabs,
  message,
  Typography,
  Divider,
  Tag,
  Empty,
} from "antd";
import {
  SendOutlined,
  MessageOutlined,
  UserOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// ==================== Constants  ====================

import { green, primaryColor } from "../../Constants/Colors";
// ==================== Functions  ====================

import getUserColor from "../../Functions/Manager/GetUserColor";
import { api } from "../../config/http";

const { TextArea } = Input;
const { Text } = Typography;

const CommentsModal = ({
  open,
  setOpen,
  taskTitle = "Task",
  taskId = null,
  currentUser = { name: "Ahmed Manager", role: "manager", roleName: "Manager" },
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({});
  const [activeTab, setActiveTab] = useState("all");

  // Load comments from API when modal opens
  useEffect(() => {
    if (open && taskId) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, taskId]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/api/comments/task/${taskId}`);
      const commentsData = response.data.map(comment => ({
        id: comment.id,
        text: comment.content,
        sender: currentUser.roleName,
        senderName: currentUser.name,
        timestamp: "Just now", // Using default timestamp since createdAt is not available in CommentDTO
        type: currentUser.role,
        read: true,
        replies: [],
      }));
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const myTabs = [
    {
      key: "all",
      label: "All",
      children: <></>,
    },
    {
      key: "manager",
      label: "My Comments",
      children: <></>,
    },
    {
      key: "member",
      label: "Member Replies",
      children: <></>,
    },
  ];

  const isManager = currentUser.role === "manager";
  const currentUserColor = isManager ? primaryColor : green;

  const unreadCount = comments.filter(
    (c) => !c.read && c.type !== currentUser.role,
  ).length;

  const handleSendComment = async () => {
    if (!newComment.trim()) {
      messageApi.warning("Please enter a comment");
      return;
    }

    if (!taskId) {
      messageApi.error("Task ID is missing");
      return;
    }

    try {
      console.log("Saving comment to backend:", { TaskId: taskId, Content: newComment });
      await api.post("/api/comments", {
        TaskId: taskId,
        Content: newComment,
      });

      const comment = {
        id: Date.now(),
        text: newComment,
        sender: currentUser.roleName,
        senderName: currentUser.name,
        timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        type: currentUser.role,
        read: true,
        replies: [],
      };

      setComments([comment, ...comments]);
      setNewComment("");
      messageApi.success("Comment sent successfully");
    } catch (error) {
      console.error("Error sending comment:", error);
      messageApi.error("Failed to send comment");
    }
  };

  const handleSendReply = (commentId) => {
    const reply = replyText[commentId];
    if (!reply || !reply.trim()) {
      messageApi.warning("Please enter a reply");
      return;
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: Date.now(),
            text: reply,
            sender: currentUser.roleName,
            senderName: currentUser.name,
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            type: currentUser.role,
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply],
            read: false,
          };
        }
        return comment;
      }),
    );

    setReplyText({ ...replyText, [commentId]: "" });
    messageApi.success("Reply sent successfully");
  };

  const markAsRead = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId && comment.type !== currentUser.role) {
          return { ...comment, read: true };
        }
        return comment;
      }),
    );
  };

  const getFilteredComments = () => {
    if (activeTab === "manager") {
      return comments.filter((c) => c.type === "manager");
    }
    if (activeTab === "member") {
      return comments.filter(
        (c) =>
          c.type === "member" || c.replies.some((r) => r.type === "member"),
      );
    }
    return comments;
  };

  
  return (
    <Modal
      title={
        <Space>
          <MessageOutlined />
          <span>{taskTitle} Comments</span>
          <Badge count={unreadCount} />
        </Space>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={700}
    >
      {contextHolder}

      {/* Comment Input */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Space orientation="vertical" style={{ width: "100%" }}>
          <Space>
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: currentUserColor }}
            />
            <Text strong>{currentUser.name}</Text>
            <Tag color={isManager ? "blue" : "green"}>
              {currentUser.roleName}
            </Tag>
          </Space>
          <TextArea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Write a comment as ${currentUser.roleName}...`}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendComment}
            block
          >
            Send Comment
          </Button>
        </Space>
      </Card>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        size="small"
        items={myTabs}
      />

      {/* Comments List */}
      <div style={{ maxHeight: 450, overflowY: "auto" }}>
        {getFilteredComments().length === 0 ? (
          <Empty
            description="No comments yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {getFilteredComments().map((comment, i) => (
              <Card
                key={i}
                size="small"
                style={{
                  marginBottom: 12,
                  backgroundColor:
                    !comment.read && comment.type !== currentUser.role
                      ? "#f0f7ff"
                      : "white",
                  borderLeft: `3px solid ${getUserColor(comment.type)}`,
                }}
                onMouseEnter={() => markAsRead(comment.id)}
              >
                {/* Comment Header */}
                <Space style={{ marginBottom: 8 }}>
                  <Avatar
                    size="small"
                    icon={<UserOutlined />}
                    style={{ backgroundColor: getUserColor(comment.type) }}
                  />
                  <Text strong>{comment.senderName}</Text>
                  <Tag color={comment.type === "manager" ? "blue" : "green"}>
                    {comment.sender}
                  </Tag>
                  {!comment.read && comment.type !== currentUser.role && (
                    <Badge status="processing" text="New" />
                  )}
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    <ClockCircleOutlined /> {comment.timestamp}
                  </Text>
                </Space>

                <Typography.Paragraph
                  style={{ marginLeft: 32, marginBottom: 8 }}
                >
                  {comment.text}
                </Typography.Paragraph>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div style={{ marginLeft: 32, marginTop: 8 }}>
                    <Divider style={{ margin: "8px 0" }} />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      Replies ({comment.replies.length})
                    </Text>
                    {comment.replies.map((reply) => (
                      <Card
                        key={reply.id}
                        size="small"
                        style={{
                          marginTop: 8,
                          backgroundColor: "#fafafa",
                          borderLeft: `3px solid ${getUserColor(reply.type)}`,
                        }}
                      >
                        <Space style={{ marginBottom: 4 }}>
                          <Avatar
                            size="small"
                            icon={<UserOutlined />}
                            style={{
                              backgroundColor: getUserColor(reply.type),
                            }}
                          />
                          <Text strong>{reply.senderName}</Text>
                          <Tag
                            color={reply.type === "manager" ? "blue" : "green"}
                            size="small"
                          >
                            {reply.sender}
                          </Tag>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            <ClockCircleOutlined /> {reply.timestamp}
                          </Text>
                        </Space>
                        <Typography.Paragraph
                          style={{ marginLeft: 32, marginBottom: 0 }}
                        >
                          {reply.text}
                        </Typography.Paragraph>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                <div style={{ marginLeft: 32, marginTop: 8 }}>
                  <Input.TextArea
                    rows={2}
                    value={replyText[comment.id] || ""}
                    onChange={(e) =>
                      setReplyText({
                        ...replyText,
                        [comment.id]: e.target.value,
                      })
                    }
                    placeholder={`Reply as ${currentUser.roleName}...`}
                    size="small"
                  />
                  <Button
                    size="small"
                    type="link"
                    icon={<SendOutlined />}
                    onClick={() => handleSendReply(comment.id)}
                    style={{ padding: 0, marginTop: 4 }}
                  >
                    Send Reply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CommentsModal;
