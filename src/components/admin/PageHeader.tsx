export default function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
