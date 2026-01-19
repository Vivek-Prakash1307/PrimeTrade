import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>

          <div className="flex items-center">
              <span className="text-sm text-gray-600">
                Hi, {user?.name || "User"}
              </span>

              {/* visual separator */}
              <span className="mx-4 h-4 w-px bg-gray-300"></span>

              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome back, {user?.name} 
        </h2>
        <p className="text-gray-500 mb-6">
          Manage your tasks 
        </p>

        {/* ADD TASK */}
        <form
          onSubmit={createTask}
          className="bg-white p-4 rounded-xl shadow-sm border mb-8 flex gap-4"
        >
          <input
            type="text"
            placeholder="What do you need to do?"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>

        {/* KANBAN BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* TODO COLUMN */}
          <KanbanColumn
            title="Todo"
            tasks={tasks}
            onDelete={deleteTask}
          />

          {/* IN PROGRESS */}
          <KanbanColumn
            title="In Progress"
            tasks={[]}
          />

          {/* COMPLETED */}
          <KanbanColumn
            title="Completed"
            tasks={[]}
          />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------------- COMPONENT ---------------- */

const KanbanColumn = ({ title, color, tasks, onDelete }) => {
  // Define color classes directly to ensure they're included in Tailwind build
  const getColorClass = (title) => {
    switch (title) {
      case 'Todo':
        return 'text-red-600';
      case 'In Progress':
        return 'text-yellow-600';
      case 'Completed':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-semibold ${getColorClass(title)}`}>
          {title}
        </h3>
        <span className="text-sm text-gray-500">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition"
            >
              <p className="text-gray-900 mb-3">
                {task.title}
              </p>

              {onDelete && (
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
