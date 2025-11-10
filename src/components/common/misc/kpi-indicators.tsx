import { cn } from "@/lib/utils";

interface ValueIndicatorProps {
  title: string;
  value: string | number;
  description: string;
  className?: string;
}

export const ValueIndicator = ({
  title,
  value,
  description,
  className,
}: ValueIndicatorProps) => {
  const isZero = value === 0 || value === "0" || value === "0.00";

  return (
    <div className="border border-medsave-black-50 rounded-lg">
      <header className="flex-1 py-2 font-bold text-lg px-3 border-b border-medsave-black-50 flex items-center justify-between">
        {title}
      </header>
      <section className="p-3 flex flex-col space-y-2">
        <h2
          className={cn(
            "text-[40px] font-semibold leading-[150%] not-italic tracking-normal",
            isZero && "text-medsave-black-100",
            className
          )}
        >
          {value}
        </h2>
        <p className="text-base leading-[140%] font-normal not-italic tracking-normal text-gray-600">
          {description}
        </p>
      </section>
    </div>
  );
};

interface AmountIndicatorProps {
  title: string;
  value: string;
  description: string;
  className?: string;
}

export const AmountIndicator = ({
  title,
  value,
  description,
  className,
}: AmountIndicatorProps) => {
  const [raw, decimal] = (value as string).split(".");
  const isZero = value === "0.00" || value === "0" || raw === "0";

  return (
    <div className="border border-medsave-black-50 rounded-lg">
      <header className="flex-1 py-2 font-bold text-lg px-3 border-b border-medsave-black-50 flex items-center justify-between">
        {title}
      </header>
      <section className="p-3 flex flex-col space-y-2">
        <h2 className={cn("text-[40px]", className)}>
          <strong
            className={cn("font-bold", isZero && "text-medsave-black-100")}
          >
            {`₵ ${raw}`}
          </strong>
          <strong className="text-medsave-black-100">{`.${decimal}`}</strong>
        </h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </section>
    </div>
  );
};
