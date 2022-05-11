import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants/index';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

// create custom hook to check if we are inside provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCount(newOptionCounts);
    }

    function resetOrder() {
      setOptionCount({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    // getter: object containing option counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
