function PageWrapper({ title, subtitle, actions, children }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="muted mt-1">{subtitle}</p>}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}

export default PageWrapper