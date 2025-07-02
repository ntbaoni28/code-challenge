import { useState } from "react";
import { cn } from "../../lib/utils";
import ChevronIcon from "../svgs/ChevronIcon";
import type { PricesProps } from "../../hooks/useSwapForm";

export interface SelectTokenProps {
  token?: PricesProps;
  tokenOptions: PricesProps[];
  onChangeToken?: (value: PricesProps) => void;
}

const SelectToken = ({
  token,
  tokenOptions,
  onChangeToken,
}: SelectTokenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTokenChange = (token: PricesProps) => {
    setIsOpen(false);
    if (onChangeToken) {
      onChangeToken(token);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative bg-background-300 rounded-full px-1 py-1 font-semibold flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="relative rounded-full inline-block w-6 h-6 bg-background-100 overflow-hidden me-2">
          {token?.img && (
            <img
              src={token.img}
              alt={token.currency}
              className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </span>

        <span className="inline-block w-12 text-center overflow-hidden rounded-full text-sm text-foreground-100">
          {token?.currency}
        </span>

        <span
          className={cn(
            "transform transition-transform",
            isOpen ? "rotate-180" : ""
          )}
        >
          <ChevronIcon className="w-5 h-5 fill-foreground-100" />
        </span>
      </button>
      <ul
        className={cn(
          "absolute top-full right-0 w-max bg-background-300 border rounded-lg mt-2 z-10",
          "max-h-60 overflow-y-auto",
          "shadow-lg",
          isOpen ? "block" : "hidden"
        )}
      >
        {tokenOptions?.map((item) => (
          <li
            key={item.currency}
            className={cn(
              "cursor-pointer relative p-2 hover:bg-background-200 flex items-center",
              token?.currency === item.currency ? "bg-background-200" : ""
            )}
            onClick={() => handleTokenChange(item)}
          >
            <span className="relative rounded-full inline-block w-5 h-5 bg-background-100 overflow-hidden me-2">
              {item.img && (
                <img
                  src={item.img}
                  alt={item.currency}
                  className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </span>

            <span className="inline-block text-center rounded-full text-xs text-foreground-100">
              {item.currency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectToken;
