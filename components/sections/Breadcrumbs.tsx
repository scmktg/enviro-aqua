import Link from "next/link";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  trail: Crumb[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex items-center flex-wrap gap-1.5 text-muted">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-ink transition-colors duration-fast"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
