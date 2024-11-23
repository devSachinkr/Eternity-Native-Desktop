import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Spinner = ({ loading = true, className, children }: Props) => {
  return loading ? (
    <div className={cn(className)}>
      <div className="loader" />
    </div>
  ) : (
    children
  );
};

export default Spinner;
