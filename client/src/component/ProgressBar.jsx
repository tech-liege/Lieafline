function ProgressBar({ value = 0 }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className='w-full'>
      <div className='h-2 w-full rounded bg-gray-200 dark:bg-gray-800'>
        <div className='h-2 rounded bg-emerald-500 transition-[width] duration-300' style={{ width: `${clamped}%` }} />
      </div>
      <div className='mt-1 text-right text-xs text-gray-500'>{clamped}%</div>
    </div>
  );
}

export default ProgressBar;
