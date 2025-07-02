import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface PricesProps {
  currency: string;
  img: string;
  price: number;
  date?: string;
}

export interface SwapInputs {
  sendPrice: number;
  sendToken: PricesProps;
  receivcePrice: number;
  receivceToken: PricesProps;
}

type SwapDataChangeKey = keyof SwapInputs;

export const useSwapForm = (tokenOption: PricesProps[]) => {
  const [data, setData] = useState<SwapInputs>({
    sendPrice: 0,
    sendToken: tokenOption[0],
    receivcePrice: 0,
    receivceToken: tokenOption[1],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenRate, setTokenRate] = useState<string>();

  const swapCurrency = (amount: number, from: PricesProps, to: PricesProps) => {
    if (amount === 0 || !from.price || !to.price) {
      return 0;
    }
    if (from === to) {
      setError("Cannot swap the same currency");
      return amount;
    }
    setError(null);
    const baseAmount = amount / from.price;
    const swappedAmount = baseAmount * to.price;
    return Math.round(swappedAmount * 1e5) / 1e5;
  };

  const handleChangeRate = (from: PricesProps, to: PricesProps) => {
    if (!from.price || !to.price) {
      return "";
    }
    const rateValue = to.price / from.price;
    setTokenRate(`1 ${from.currency} ≈ ${rateValue.toFixed(5)} ${to.currency}`);
  };

  const checkNoDuplicateToken = (
    currentToken: PricesProps,
    otherToken: PricesProps
  ) => {
    if (currentToken.currency === otherToken.currency) {
      return tokenOption.find(
        (token) => token.currency !== currentToken.currency
      ) || currentToken;
    }

    return currentToken;
  };

  const handleChangeSendPrice = (value: number) => {
    setData((prev) => ({
      ...prev,
      receivcePrice: swapCurrency(value, prev.sendToken, prev.receivceToken),
      sendPrice: value,
    }));
  };

  const handleChangeSendToken = (value: PricesProps) => {
    const receivceToken = checkNoDuplicateToken(data.receivceToken, value);
    setData((prev) => ({
      ...prev,
      receivceToken,
      receivcePrice: swapCurrency(prev.sendPrice, value, receivceToken),
      sendToken: value,
    }));
  };

  const handleChangeReceivcePrice = (value: number) => {
    setData((prev) => ({
      ...prev,
      receivcePrice: value,
      sendPrice: swapCurrency(value, prev.receivceToken, prev.sendToken),
    }));
  };

  const handleChangeReceivceToken = (value: PricesProps) => {
    const sendToken = checkNoDuplicateToken(data.sendToken, value);
    setData((prev) => ({
      ...prev,
      sendToken,
      receivceToken: value,
      receivcePrice: swapCurrency(prev.sendPrice, sendToken, value),
    }));
  };

  const handleSwap = () => {
    const receivcePrice = swapCurrency(
      data.sendPrice,
      data.receivceToken,
      data.sendToken
    );
    setData((prev) => ({
      ...prev,
      sendToken: prev.receivceToken,
      receivcePrice,
      receivceToken: prev.sendToken,
    }));
  };

  const handleDataChange = (
    type?: SwapDataChangeKey,
    value?: PricesProps | number
  ) => {
    switch (type) {
      case "sendPrice":
        handleChangeSendPrice(Number(value));
        break;
      case "sendToken":
        handleChangeSendToken(value as PricesProps);
        break;
      case "receivcePrice":
        handleChangeReceivcePrice(Number(value));
        break;
      case "receivceToken":
        handleChangeReceivceToken(value as PricesProps);
        break;
      default:
        handleSwap();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (data.sendPrice <= 0) {
      toast.error("Please enter a valid amount to send");
      return false;
    }

    if (data.receivceToken === data.sendToken) {
      toast.error("Cannot swap the same currency");
      return false;
    }

    setLoading(true);
    toast.dismiss();
    setTimeout(() => {
      setLoading(false);
      toast.success("Finished swapping! 🎉");
    }, 3000);
  };

  useEffect(() => {
    handleChangeRate(data.sendToken, data.receivceToken);
  }, [data]);

  return {
    error,
    handleSubmit,
    loading,
    data,
    handleDataChange,
    tokenRate,
  };
};
