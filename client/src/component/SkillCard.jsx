import { Edit2, Trash2 } from 'lucide-react';
import ProgressBar from './ProgressBar';

function SkillCard({ title, desc, percent = 0, tags = [], onEdit, onDelete }) {
  return (
    <div className='relative group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1'>
      {/* Header */}
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
        <span className='text-sm font-medium text-gray-500'>{percent}%</span>
      </div>

      {/* Description */}
      {desc && <p className='mb-3 text-sm text-gray-600'>{desc}</p>}

      {/* Progress */}
      <ProgressBar value={percent} />

      {/* Tags */}
      {tags?.length > 0 && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map(t => (
            <span
              key={t}
              className='rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600'>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons (appear on hover) */}
      <div className='absolute right-3 top-3 hidden items-center gap-2 rounded-md bg-white/70 p-1 shadow-sm backdrop-blur group-hover:flex'>
        <button
          onClick={onEdit}
          className='rounded-md p-1.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors'
          title='Edit'>
          <Edit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className='rounded-md p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors'
          title='Delete'>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default SkillCard;
