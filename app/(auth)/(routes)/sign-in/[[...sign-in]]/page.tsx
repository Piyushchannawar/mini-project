import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='h-screen bg-gray-100 flex items-center justify-center'>
      <div className='p-8 bg-white shadow-lg rounded-lg'>
        <SignIn />
      </div>
    </div>
  );
}
