import React from 'react';
import { X } from 'lucide-react';

export const ProgressModal = ({ skill, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50'>
      <div className='bg-[#001d3d] text-white rounded-2xl shadow-lg w-[90%] max-w-lg p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>{skill.name}</h2>
          <button onClick={onClose}>
            <X className='text-gray-300 hover:text-white' />
          </button>
        </div>
        <p className='text-gray-300 mb-4'>Progress: {skill.progress}%</p>
        <div className='space-y-3'>
          <button className='w-full py-2 rounded-lg bg-[#003566] hover:bg-[#001d3d] transition'>Mark as Completed</button>
          <button className='w-full py-2 rounded-lg bg-[#0077b6] hover:bg-[#00b4d8] transition'>Add Note or Resource</button>
        </div>
      </div>
    </div>
  );
};
