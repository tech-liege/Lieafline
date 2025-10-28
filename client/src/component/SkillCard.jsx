import ProgressBar from './ProgressBar';

function SkillCard({ title, desc, percent = 0, tags = [] }) {
  return (
    <div className='rounded-xl border p-4 shadow-sm hover:shadow transition-shadow'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-base font-semibold'>{title}</h3>
        <span className='text-xs text-gray-500'>{percent}%</span>
      </div>
      {desc && <p className='mb-3 text-sm text-gray-600 dark:text-gray-300'>{desc}</p>}
      <ProgressBar value={percent} />
      {tags?.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-2'>
          {tags.map(t => (
            <span key={t} className='rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800'>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillCard;