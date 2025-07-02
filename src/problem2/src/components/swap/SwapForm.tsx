import Button from "../common/Button";
import SwapIcon from "../svgs/SwapIcon";
import SwapInput from "./SwapInput";
import { Prices } from "../../lib/prices";
import { useSwapForm } from "../../hooks/useSwapForm";

const SwapForm = () => {
  const { tokenRate, data, handleDataChange, handleSubmit, loading } =
    useSwapForm(Prices);

  return (
    <div className="min-h-[100dvh] w-full bg-background-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] lg:max-w-[700px] p-3 lg:p-5"
      >
        <h1 className="text-center font-bold text-2xl text-white">Swap</h1>
        <div className="flex flex-col gap-4 my-5 relative lg:flex-row lg:items-center lg:justify-between">
          <SwapInput
            title="Amount to send"
            tokenOptions={Prices}
            token={data.sendToken}
            onChangeToken={(value) => handleDataChange("sendToken", value)}
            price={data.sendPrice}
            onChangePrice={(value) => handleDataChange("sendPrice", value)}
          />
          <SwapInput
            title="Amount to receivce"
            tokenOptions={Prices}
            token={data.receivceToken}
            onChangeToken={(value) => handleDataChange("receivceToken", value)}
            price={data.receivcePrice}
            onChangePrice={(value) => handleDataChange("receivcePrice", value)}
          />
          <Button
            isRounded
            type="button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 lg:rotate-0"
            onClick={() => handleDataChange()}
          >
            <SwapIcon className="w-5 h-5 stroke-gray-950" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-5">
          <h5 className="text-sm text-foreground-300">Price rate</h5>
          <span className="text-sm text-foreground-100">{tokenRate}</span>
        </div>
        <Button className="w-full" type="submit" isLoading={loading}>
          Confirm Swap
        </Button>
      </form>
    </div>
  );
};

export default SwapForm;
