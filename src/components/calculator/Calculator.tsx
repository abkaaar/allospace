import Wrapper from "./Wrapper";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import { btnValues } from "@/constants/btnValues";

const Calculator = () => {
  return (
    <Wrapper>
      <ButtonBox>
        {btnValues.flat().map((btn, i) => (
          <Button value={btn} key={i} />
        ))}
      </ButtonBox>
    </Wrapper>
  );
};

export default Calculator;
