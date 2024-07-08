import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/custom/button';
import { cn } from '@/lib/utils';
import Paw from '@/assets/Paw2.svg';

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

export default function GeneralError({ className, minimal = false }: GeneralErrorProps) {
  const navigate = useNavigate();
  return (
    <div className={cn('h-svh', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <img src={Paw} alt='Logo' className='w-44 h-44' />
        {!minimal && <h1 className='text-[7rem] font-bold leading-tight'>500</h1>}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
