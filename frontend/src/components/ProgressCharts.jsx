import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];

function ProgressCharts({ tasks }) {
  const statusData = [
    {
      name: "To Do",
      value: tasks.filter((task) => task.status === "To Do").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "In Progress").length,
    },
    {
      name: "Done",
      value: tasks.filter((task) => task.status === "Done").length,
    },
  ];

  return (
    <div className="charts-grid">
      <article className="panel chart-box">
        <h3>Task Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </article>

      <article className="panel chart-box">
        <h3>Status Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>
    </div>
  );
}

export default ProgressCharts;
