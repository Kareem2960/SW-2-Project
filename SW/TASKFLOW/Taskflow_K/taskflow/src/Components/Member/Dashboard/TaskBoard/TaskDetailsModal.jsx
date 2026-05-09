import React, { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiEdit2,
  FiFile,
  FiMessageCircle,
  FiPaperclip,
  FiSend,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../../../../Context/DarkModeProvider";
import { primaryColor } from "../../../../Constants/Colors";
import { api } from "../../../../config/http";

const emptyDraft = {
  title: "",
  statusLabel: "Todo",
  priority: "medium",
  description: "",
  assignedTo: "Emma Wilson",
  createdBy: "Sarah Johnson",
  dueDate: "",
  lastUpdated: "about 2 years ago",
  attachments: [],
  comments: [],
};

const TaskDetailsModal = ({ task, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const [draft, setDraft] = useState(emptyDraft);
  const [newComment, setNewComment] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!task) {
      setDraft(emptyDraft);
      setNewComment("");
      return;
    }

    setDraft({
      title: task.title || "",
      statusLabel: task.statusLabel || "Todo",
      priority: task.priority || "medium",
      description: task.description || "",
      assignedTo: task.assignedTo || "Emma Wilson",
      createdBy: task.createdBy || "Sarah Johnson",
      dueDate: task.dueDate || "",
      lastUpdated: task.lastUpdated || "about 2 years ago",
      attachments: task.attachments || [],
      comments: task.comments || [],
    });
    setNewComment("");
  }, [task]);

  if (!task) {
    return null;
  }

  const canSave = !!(
    draft.title.trim() &&
    draft.description.trim() &&
    draft.dueDate.trim()
  );

  const handleFieldChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      return;
    }

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("taskId", parseInt(task.id));
        formData.append("file", file);

        await api.post("/api/attachments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const mapped = files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      }));

      setDraft((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...mapped],
      }));
    } catch (error) {
      console.error("Error uploading attachments:", error);
    }

    event.target.value = "";
  };

  const removeAttachment = (attachmentId) => {
    setDraft((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((item) => item.id !== attachmentId),
    }));
  };

  const addComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) {
      return;
    }

    try {
      await api.post("/api/comments", {
        taskId: parseInt(task.id),
        content: trimmed,
      });
      setDraft((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          { id: `${Date.now()}`, text: trimmed, author: "You" },
        ],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleSave = async () => {
    if (!canSave) {
      return;
    }
    await onSave?.({
      ...task,
      ...draft,
      lastUpdated: "just now",
    });
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div
        className={`max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-4 shadow-xl ${
          isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-slate-800"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <select
            value={draft.statusLabel}
            onChange={(e) => handleFieldChange("statusLabel", e.target.value)}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs"
          >
            <option>Todo</option>
            <option>In progress</option>
            <option>Done</option>
          </select>
          <select
            value={draft.priority}
            onChange={(e) => handleFieldChange("priority", e.target.value)}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs"
          >
            <option>high</option>
            <option>medium</option>
            <option>low</option>
          </select>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FiEdit2 className="h-3.5 w-3.5" />
            Description
          </p>
          <textarea
            rows={3}
            value={draft.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="w-full resize-none rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="space-y-3">
            <p className="flex items-center gap-2"><FiUser className="h-3.5 w-3.5" />Assigned To</p>
            <input
              value={draft.assignedTo}
              onChange={(e) => handleFieldChange("assignedTo", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
            <p className="flex items-center gap-2"><FiCalendar className="h-3.5 w-3.5" />Due Date</p>
            <input
              value={draft.dueDate}
              onChange={(e) => handleFieldChange("dueDate", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2"><FiUser className="h-3.5 w-3.5" />Created By</p>
            <input
              value={draft.createdBy}
              onChange={(e) => handleFieldChange("createdBy", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
            <p className="flex items-center gap-2"><FiClock className="h-3.5 w-3.5" />Last Updated</p>
            <input
              value={draft.lastUpdated}
              onChange={(e) => handleFieldChange("lastUpdated", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
          </div>
        </div>

        <div className="mt-4 rounded-md border border-slate-200 p-3 text-xs text-slate-600">
          <p className="mb-2 flex items-center gap-2 font-medium">
            <FiPaperclip className="h-3.5 w-3.5" />
            Attachments ({draft.attachments.length})
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50"
          >
            Add Attachment
          </button>
          {draft.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {draft.attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
                  <span className="flex items-center gap-1 text-xs">
                    <FiFile className="h-3.5 w-3.5" />
                    {file.name} ({file.size})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(file.id)}
                    className="rounded p-1 text-rose-500 hover:bg-rose-50"
                    aria-label="Remove attachment"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-md border border-slate-200 p-3 text-xs text-slate-600">
          <p className="mb-2 flex items-center gap-2 font-medium">
            <FiMessageCircle className="h-3.5 w-3.5" />
            Comments ({draft.comments.length})
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
              placeholder="Add a comment..."
              className="w-full rounded-md border border-slate-200 px-2 py-1"
            />
            <button
              type="button"
              onClick={addComment}
              className="rounded-md bg-indigo-100 p-2 text-indigo-700 hover:bg-indigo-200"
              aria-label="Add comment"
            >
              <FiSend className="h-3.5 w-3.5" />
            </button>
          </div>
          {draft.comments.length > 0 && (
            <div className="mt-2 space-y-1">
              {draft.comments.map((comment) => (
                <p key={comment.id} className="rounded-md bg-slate-50 px-2 py-1">
                  <span className="font-medium">{comment.author}: </span>
                  {comment.text}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-1.5 text-xs hover:bg-slate-100">
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
