import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0-5, peut être décimal
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}

export const StarRating = ({ 
  rating, 
  onRatingChange, 
  interactive = false,
  size = "md",
  showValue = false,
  count
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      // Optionnel: prévisualisation au survol
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((value) => {
          const isFilled = value <= Math.round(rating);
          const isHalf = value - 0.5 <= rating && rating < value;
          
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleClick(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              disabled={!interactive}
              className={cn(
                "transition-colors",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled || isHalf
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-muted-foreground",
                  interactive && "hover:fill-yellow-300 hover:text-yellow-300"
                )}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-foreground ml-1">
          {rating > 0 ? rating.toFixed(1) : "—"}
        </span>
      )}
      {count !== undefined && count > 0 && (
        <span className="text-xs text-muted-foreground ml-1">
          ({count})
        </span>
      )}
    </div>
  );
};

