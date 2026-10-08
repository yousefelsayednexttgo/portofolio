import { BarChart3, Code2, Layers3, MousePointer2, ScanLine, ShoppingBag, Store, Tag, Target, type LucideProps } from "lucide-react";

const icons = { store: Store, target: Target, layers: Layers3, mouse: MousePointer2, chart: BarChart3, bag: ShoppingBag, code: Code2, tag: Tag, scan: ScanLine };
export function Icon({ name, ...props }: LucideProps & { name: string }) {
  const Component = icons[name as keyof typeof icons] || Code2;
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />;
}
