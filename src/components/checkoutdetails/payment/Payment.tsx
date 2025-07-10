import { Button } from '@/components/ui/button';

const Payment = () => {
  return (
    <>
      <div>
        <p>Choose Payment Method</p>
        <Button
         className='bg-green-500 text-white w-full'
        >
          Proceed To Pay
        </Button>
      </div>
    </>
  );
};


export default Payment