import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Done"];

function KanbanBoard({ tasks, users, onMove }) {
  return (
    <section className="kanban-grid">
      {columns.map((column) => (
        <div key={column} className="kanban-column">
          <h3>{column}</h3>
          {tasks
            .filter((task) => task.status === column)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                users={users}
                onMove={onMove}
              />
            ))}
        </div>
      ))}
    </section>
  );
}

export default KanbanBoard;
