import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const {
    tasks,
    fetchTasks,
    addTask,
    deleteTask,
    updateTask,
    user,
    fetchUser,
    logout,
    loading,
    error
  } = useStore();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  // 🔥 MOCK STATE
  const [mockTasks, setMockTasks] = useState([
    { _id: "m1", title: "ทำโปรเจค", status: "todo", priority: "high" },
    { _id: "m2", title: "อ่านหนังสือ", status: "done", priority: "medium" },
    { _id: "m3", title: "ออกกำลังกาย", status: "todo", priority: "low" }
  ]);

  const mergedTasks = [...mockTasks, ...tasks];

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  // ✅ toggle
  const handleToggle = (t) => {
    if (t._id.startsWith("m")) {
      setMockTasks(prev =>
        prev.map(item =>
          item._id === t._id
            ? { ...item, status: item.status === "done" ? "todo" : "done" }
            : item
        )
      );
    } else {
      updateTask(t._id, {
        status: t.status === "done" ? "todo" : "done"
      });
    }
  };

  // ✅ delete
  const handleDelete = (t) => {
    if (t._id.startsWith("m")) {
      setMockTasks(prev => prev.filter(item => item._id !== t._id));
    } else {
      deleteTask(t._id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome, <span className="font-semibold">
              {user?.username || "ผู้ใช้"}
            </span>
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* ADD TASK */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option> 
          <option value="medium">Medium</option> 
          <option value="high">High</option>
        </select>

        <button
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          onClick={() => {
            if (!title) return;
            addTask({ title, priority });
            setTitle("");
          }}
        >
          Add
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {/* TASK LIST */}
      <div className="grid gap-4">
        {mergedTasks.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{t.title}</p>

              {/* STATUS */}
              <span
                className={`text-sm px-2 py-1 rounded ${
                  t.status === "done"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {t.status === "done" ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}
              </span>

              {/* PRIORITY */}
              <span
                className={`ml-2 text-sm px-2 py-1 rounded ${
                  t.priority === "high"
                    ? "bg-red-200 text-red-700"
                    : t.priority === "medium"
                    ? "bg-blue-200 text-blue-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {t.priority === "high"
                  ? "High"
                  : t.priority === "medium"
                  ? "Medium"
                  : "Low"}
              </span>

              
            </div>

            {/* ACTION */}
            <div className="flex gap-2">

              <button
                onClick={() => handleToggle(t)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {t.status === "done"
                  ? "ยังไม่เสร็จ"
                  : "เสร็จแล้ว"}
              </button>

              <button
                onClick={() => handleDelete(t)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                ลบ
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}