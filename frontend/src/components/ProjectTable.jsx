import { Link } from "react-router-dom";

function ProjectTable({ projects, progressByProject, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Groups</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.groups.length}</td>
              <td>{progressByProject(project)}%</td>
              <td className="actions">
                <Link to={`/admin/assign-groups/${project.id}`}>
                  Assign Groups
                </Link>
                <Link to={`/admin/group-progress/${project.id}`}>
                  View Progress
                </Link>
                <Link to={`/admin/review-submissions/${project.id}`}>
                  Review Submissions
                </Link>
                <Link to={`/projects/${project.id}`}>Project Page</Link>
                <button
                  className="link-btn"
                  onClick={() => onDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
