import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-white shadow-sm hover:shadow-md transition-all duration-200",
        "hover:transform hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;