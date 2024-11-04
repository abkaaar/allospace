import { Link } from "react-router-dom";


const Notfound: React.FC = () => {

  return (
    <>
    <div className="h-full w-full flex flex-col items-center justify-center">
        <Link to='/' className="underline" >Go Back Home</Link>
        <img src="/not_found.svg" className="max-h-64 max-w-64"/>
    </div>
    </>
  );
};

export default Notfound;
