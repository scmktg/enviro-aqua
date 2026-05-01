import clsx from "clsx";
import { formatPriceParts } from "@/lib/format";

interface PriceProps {
  amount: number;
  /** Crossed-out RRP shown next to the sale price. */
  compareAt?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Tax-inclusive label — usually true for AU display. */
  showIncTax?: boolean;
}

const sizeClass: Record<NonNullable<PriceProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

export function Price({
  amount,
  compareAt,
  size = "md",
  className,
  showIncTax,
}: PriceProps) {
  const { symbol, whole, fraction } = formatPriceParts(amount);
  const onSale = compareAt !== undefined && compareAt > amount;

  return (
    <span className={clsx("inline-flex items-baseline gap-2 tabular", className)}>
      <span className={clsx("font-semibold text-ink", sizeClass[size])}>
        {symbol}
        {whole}
        {fraction !== null && (
          <span className="text-[0.65em] align-baseline">.{fraction}</span>
        )}
      </span>
      {onSale && compareAt !== undefined && (
        <span className="text-sm text-muted line-through">
          ${compareAt.toFixed(Number.isInteger(compareAt) ? 0 : 2)}
        </span>
      )}
      {showIncTax && (
        <span className="text-xs text-muted font-normal not-italic">inc. GST</span>
      )}
    </span>
  );
}
