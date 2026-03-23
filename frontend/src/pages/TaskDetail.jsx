import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useStore();
  const navigate = useNavigate();

  const task = tasks.find(t => t._id === id);

  if (!task) return <div className="p-6">No Task</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={()=>navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>
    </div>
  );
}