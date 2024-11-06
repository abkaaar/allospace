import { useEffect } from 'react';
import { Link, useLocation, 
  // useNavigate
 } from 'react-router-dom';
import axios from 'axios';
import { CheckCheck } from 'lucide-react';


const PaystackCallback = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get('reference');

      useEffect(() => {
        const verifyPayment = async () => {
          if (reference) {
            try {
              const response = await axios.get(`http://localhost:3000/verify`, {
                params: { reference },
              });
              // Handle success - redirect or show a success message
              console.log("Payment verified:", response.data);
            } catch (error) {
              // Handle errors
              console.error("Verification failed:", error);
            }
          }
        };
        verifyPayment();
      }, [reference]);
    

  return (

    <>
     <div className='h-full w-full flex flex-col items-center justify-center gap-8 p-8'>
     <div className="flex justify-center items-center">
        <h1 className='text-xl text-[#00593F]'> Payment successful </h1>
        <CheckCheck/>
      </div>
      <div>
        <img src="/illustrations/high_five.svg" alt="" width={350} />
      </div>
      <div className='flex gap-4'>
        <Link to='/' className='underline'>Go Home</Link> or 
        <Link to='/' className='underline'>Download reciept</Link>
      </div>
     </div>
    </>
  );
};

export default PaystackCallback;
