import { useEffect } from 'react';
import { useLocation, 
  // useNavigate
 } from 'react-router-dom';
import axios from 'axios';


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
      <div className="flex justify-center mt-24">
        <h1> Payment successful ??</h1>
      </div>
    </>
  );
};

export default PaystackCallback;
