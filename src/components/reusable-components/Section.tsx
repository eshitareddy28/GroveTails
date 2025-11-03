import { ReactNode } from "react";

export default function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className=" p-6 rounded-xl shadow-sm border bg-light-card-dark dark:bg-dark-card ">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-black dark:text-white mb-4">
        {icon && <span className="text-green-600">{icon}</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}
