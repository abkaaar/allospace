import React, { createContext, useState } from "react";

interface ContextType {
  dispatch: React.Dispatch<any>;
}
type CalcType = {
  children: React.ReactNode;
};
export const CalcContext = createContext<ContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: CalcType) => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const providerValue = {
    calc,
    setCalc,
  };
  return (
    <CalcContext.Provider value={providerValue}>
      {children}
    </CalcContext.Provider>
  );
};
