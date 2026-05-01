import type { Product } from "@/types/product";
import { listFormat } from "@/lib/format";

interface SpecsTableProps {
  product: Product;
}

/**
 * Renders the product's facet data as a definition list. Specs are the
 * single most-read content on a PDP for this category — buyers are
 * matching housing sizes and flow rates to existing systems. Tabular
 * figures and clear key/value layout matter here.
 */
export function SpecsTable({ product }: SpecsTableProps) {
  const f = product.facets;
  const rows: { key: string; value: string }[] = [];

  if (f.flow_rate) rows.push({ key: "Flow rate", value: f.flow_rate });
  if (f.housing_size)
    rows.push({ key: "Housing size", value: f.housing_size });
  if (f.stages !== undefined)
    rows.push({ key: "Stages", value: String(f.stages) });
  if (f.micron) rows.push({ key: "Micron rating", value: f.micron });
  if (f.technology && f.technology.length > 0)
    rows.push({ key: "Filter media", value: listFormat(f.technology) });
  if (f.removes && f.removes.length > 0)
    rows.push({ key: "Reduces", value: listFormat(f.removes) });
  if (f.application && f.application.length > 0)
    rows.push({ key: "Application", value: listFormat(f.application) });

  if (rows.length === 0) return null;

  return (
    <section aria-label="Specifications" className="mt-10">
      <h2 className="text-base font-semibold tracking-tight mb-4">
        Specifications
      </h2>
      <dl className="border border-line rounded-sm divide-y divide-line bg-paper">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-4 px-5 py-3 text-sm"
          >
            <dt className="text-muted">{row.key}</dt>
            <dd className="text-ink capitalize tabular">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
