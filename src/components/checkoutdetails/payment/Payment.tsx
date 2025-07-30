import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

const Payment = () => {
  return (
    <>
      <div>
        <p>Choose Payment Method</p>
        <Link to='/payment'>
        <Button
         className='bg-green-500 text-white w-full'
        >
          Proceed To Pay
        </Button>
        </Link>
      </div>
    </>
  );
};


export default Payment