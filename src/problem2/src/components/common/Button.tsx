import { cn } from "../../lib/utils";
import LoadingIcon from "../svgs/LoadingIcon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  isRounded?: boolean;
  isLoading?: boolean;
}
const Button = ({
  children,
  isRounded,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-btn text-background font-semibold text-lg rounded-full transition-color duration-300 hover:bg-btn-hover",
        isRounded ? "p-2" : "py-2 px-4",
        isLoading ? "bg-btn-disabled pointer-events-none" : "",
        className
      )}
      {...props}
    >
      <span className="relative">
        {isLoading && (
          <LoadingIcon className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[150%] size-5 animate-spin text-background-100" />
        )}
        {children}
      </span>
    </button>
  );
};

export default Button;
