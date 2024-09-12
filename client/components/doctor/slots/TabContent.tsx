import { Days } from '@/types';
import React from 'react';

type Props = {
    day: Days;
}

const TabContent = ({ day }: Props) => {
  return (
    <div className="rounded-xl shadow-md bg-black opacity-85 flex">
      <div className="w-1/2 p-4">
        <h2 className=" text-lg font-semibold">Left Side for {day}</h2>
        <p className="text-gray-400">This is the left half of the content.</p>
      </div>

      <div className="w-1/2 p-4">
        <h2 className=" text-lg font-semibold">Right Side for {day}</h2>
        <p className="text-gray-400">This is the right half of the content.</p>
      </div>
    </div>
  );
}

export default TabContent;
