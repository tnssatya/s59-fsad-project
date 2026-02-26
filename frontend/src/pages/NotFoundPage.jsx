import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../components/ui/Button";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-4 dark:bg-bgDark">
      <section className="panel w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="muted">This route does not exist.</p>
        <Link to="/landing">
          <Button className="mt-2" iconLeft={FiArrowLeft}>
            Go to Landing
          </Button>
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
