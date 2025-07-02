interface WalletBalance {
  currency: string;
  amount: number;
}

/* 
- The code is not using the WalletBalance type correctly, leading to potential type
  mismatches and confusion -> Define FormattedWalletBalance as a separate interface that includes the formatted property.
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
*/
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

/* 
- The Props doesn't has any properties other than those inherited from BoxProps. If you won’t add more props use the solution below:

1. Use BoxProps directly in the Props interface.
  const WalletPage: React.FC<BoxProps> = (props) => {}

2. Use Type alias to simplify the code. Remove the Props.
  type Props = BoxProps;
*/
interface Props extends BoxProps {

}

/* 
- React.FC<Props> already tells TypeScript that props is of type Props. There’s no need to annotate props again:
1. Remove the type annotation from props in the function signature.
  const WalletPage: React.FC<Props> = (props) => {}

2. Remove React.FC 
const WalletPage = (props: Props) => { ... }
*/
const WalletPage: React.FC<Props> = (props: Props) => {

  /* 
    - The children prop is not being used in the component, which can lead to confusion.
    -> If you don't need children, you can remove it from the destructuring
    -> If you need children, you can use it in the component. 
    const { ...rest } = props;

    - The rest is not needed if you are not using any other props.
    -> If you need to pass other props, you can keep the destructuring and use the rest operator.
    -> If you don't need to pass other props, you can remove the destructuring and use props directly.
  */
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /*
    - The getPriority function can be simplified by using a switch statement or a map object.
    - The -99 is used multiple times thoroughout the code, so that should be defined as a contanst.
    - Type BLockchain to make sure that the blockchain is one of the keys in BLOCKCHAIN_PRIORITIES.
    - TypeScript infers the return type of getPriority automatically: 
      + PRIORITIES[blockchain] is number | undefined
      + ?? UNKNOWN_BLOCKCHAIN_PRIORITY ensures result is number
      -> So the whole return type is number

    const BLOCKCHAIN_PRIORITIES = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    const UNKNOWN_BLOCKCHAIN_PRIORITY = -99; 

    type Blockchain = keyof typeof BLOCKCHAIN_PRIORITIES;
    const getPriority = (blockchain: Blockchain) => {
      return PRIORITIES[blockchain] || UnknownBlockchain;
    }
  */
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  /* 
    - The lhsPriority is not defined in the code, so it should be defined before using it.
    - The filter function is not using the balancePriority variable, so it should be removed.
    - Conditional statements can be simplified by using a single return statement.
    
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance) => {
          const priority = getPriority(balance.blockchain);
          return priority > UNKNOWN_BLOCKCHAIN_PRIORITY && balance.amount > 0;
        })
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
    }, [balances, prices]);
  */
  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  /* 
    - The formattedBalances is not needed, so it should be removed.
    - The classes.row is not defined in the code, so it should be removed or defined
    - The rows variable can be simplified by using the map function directly on the sortedBalances.

    <div {...props}>
      {sortedBalances.map((balance, index) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
        return (
          <WalletRow
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  */

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}