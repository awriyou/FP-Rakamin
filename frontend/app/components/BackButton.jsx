import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button className='bg-transparent' onClick={handleBack}>
      <svg className='w-[20px] h-[20px] text-cyan-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 5H1m0 0 4 4M1 5l4-4' />
      </svg>
    </button>
  );
};

export default BackButton;
