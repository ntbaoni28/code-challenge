import Card from "../common/Card";
import type { SelectTokenProps } from "./SelectToken";
import SelectToken from "./SelectToken";


interface SwapInputProps extends SelectTokenProps {
  title: string;
  price: number;
  onChangePrice: (price: number) => void;
}

const acceptedKeys = new Set([ ",", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Enter"]);
const SwapInput = ({
  title,
  price,
  onChangePrice,
  ...selectTokenProps
}: SwapInputProps) => {

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers and control keys
    if (acceptedKeys.has(e.key)) {
      return true;
    }
    
    if (isNaN(Number(e.key))) {
      e.preventDefault();
      return false;
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value.length > 1 && value.startsWith("0")) {
      e.currentTarget.value = value.slice(1);
    }
  };
  return (
    <Card>
      <div className="flex gap-2 justify-between mb-2">
        <h5 className="font-semibold text-sm text-foreground-300">{title}</h5>
        <SelectToken {...selectTokenProps} />
      </div>

      <div className="">
        <input
          className="outline-none border-0 text-foreground-100 w-full text-2xl"
          type="number"
          value={price}
          onChange={(e) => onChangePrice(Number(e.target.value) || 0)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
    </Card>
  );
};

export default SwapInput;
