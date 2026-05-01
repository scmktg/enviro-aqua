/**
 * Facet summary — a derived view of product attributes used to populate
 * the filter rail. Lives in `types/` rather than `lib/catalogue.ts` so
 * client components can import the type without dragging the catalogue
 * data graph into their compile path.
 */
export interface FacetSummary {
  key: string;
  label: string;
  values: { value: string; count: number }[];
}
