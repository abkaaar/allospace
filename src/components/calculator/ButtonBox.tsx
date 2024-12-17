type ButtonBoxProps = {
  children: React.ReactNode;
};
const ButtonBox = ({ children }: ButtonBoxProps) => {
  return <div className="grid grid-cols-4 gap-5">{children}</div>;
};

export default ButtonBox;
