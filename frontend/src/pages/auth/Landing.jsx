import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiShield, FiUsers } from "react-icons/fi";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function Landing() {
  return (
    <main className="min-h-screen bg-[color:var(--color-public-bg)] px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-linear-to-r from-primary to-accent p-8 text-white md:p-12">
          <p className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            tns
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">
            Manage student projects with clarity and momentum.
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50">
            Plan milestones, coordinate tasks, track progress dashboards, and
            streamline teacher feedback—all in one modern workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                iconRight={FiArrowRight}
                className="bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary)] hover:brightness-110"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <Card className="space-y-4">
            <FiUsers className="text-2xl text-primary" />
            <h2 className="text-xl font-semibold">I am a Student</h2>
            <p className="muted">
              Track tasks, collaborate with your group, and submit milestones
              with transparent feedback.
            </p>
            <Link to="/register?role=student">
              <Button iconRight={FiArrowRight}>Continue as Student</Button>
            </Link>
          </Card>

          <Card className="space-y-4">
            <FiShield className="text-2xl text-accent" />
            <h2 className="text-xl font-semibold">I am a Teacher</h2>
            <p className="muted">
              Create projects, assign groups, monitor progress, and review
              submissions with clear status controls.
            </p>
            <Link to="/register?role=admin">
              <Button iconLeft={FiCheck} iconRight={FiArrowRight}>
                Continue as Teacher
              </Button>
            </Link>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Landing;
