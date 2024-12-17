import { useContext } from "react";
import { CalcContext } from "@/context/CalcContext";

const getStyleName = (btn: any) => {
  const className: any = {
    "=": "equals",
    "x": "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[btn];
};

const Button = ({ value }: { value: string | number }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // User click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  // User click C
  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };
  // User click number
  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };
  // User click operation
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
  // User click equals
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a: any, b: any, sign: any) => {
        const result = {
          "+": (a: any, b: any) => a + b,
          "-": (a: any, b: any) => a - b,
          "x": (a: any, b: any) => a * b,
          "/": (a: any, b: any) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  // User click persen
  const persenClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };
  // User click invert button
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      "C": resetClick,
      "/": signClick,
      "x": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
