import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import { formatDate } from "../../utils/helpers";

function ChatPage() {
  const { projectId } = useParams();
  const { currentUser, users } = useAuth();
  const { projects, addComment } = useProjects();
  const [text, setText] = useState("");

  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const send = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addComment(project.id, { userId: currentUser.id, text: text.trim() });
    setText("");
  };

  return (
    <section className="panel">
      <h1>Group Chat - {project.title}</h1>
      <div className="chat-box">
        {project.comments.map((comment) => {
          const owner = users.find((user) => user.id === comment.userId);
          return (
            <article key={comment.id} className="chat-item">
              <h4>{owner?.name || "Unknown"}</h4>
              <p>{comment.text}</p>
              <p className="muted">{formatDate(comment.createdAt)}</p>
            </article>
          );
        })}
      </div>
      <form className="inline-form" onSubmit={send}>
        <input
          placeholder="Write a message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Button iconLeft={FiSend} type="submit">
          Send
        </Button>
      </form>
    </section>
  );
}

export default ChatPage;
