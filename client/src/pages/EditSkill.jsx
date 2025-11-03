import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getOneSkill, updateSkill } from '../services/skillApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function EditSkill() {
  const [form, setForm] = useState({ title: '', description: '', tags: '', phases: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  const { skillId } = useParams();
  const { token, SKILL_SERVER_URL } = useAuth();

  useEffect(() => {
    getOneSkill(SKILL_SERVER_URL, token, skillId)
      .then(data => {
        if (data.message === 'success') {
          const skill = data.skill;
          setForm({
            title: skill.title,
            description: skill.description,
            tags: skill.tags.join(', '),
            phases: skill.phases || [],
          });
        } else if (data.message === 'Skill not found') {
          toast.error('Skill not found')
        }
      })
      .catch(err => {
        toast.error('Failed to fetch skill');
        console.error(err);
      })
      .finally(() => setFetching(false));
  }, [skillId, token, SKILL_SERVER_URL]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.title || !form.description || !form.tags) {
      toast.error('Title, description, and tags are required');
      setIsLoading(false);
      return;
    }

    try {
      const tagsArray = form.tags.split(',').map(tag => tag.trim());
      const data = await updateSkill(SKILL_SERVER_URL, token, skillId, {
        ...form,
        tags: tagsArray,
      });
      if (data.message === 'success') {
        toast.success('Skill updated successfully!');
        setSuccess(true);
      }
    } catch (error) {
      toast.error('Update failed. Check network.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add / Remove functionality for phases, modules, lessons
  const addPhase = () => {
    setForm(prev => ({
      ...prev,
      phases: [...prev.phases, { title: '', description: '', modules: [] }],
    }));
  };

  const removePhase = index => {
    const newPhases = [...form.phases];
    newPhases.splice(index, 1);
    setForm({ ...form, phases: newPhases });
  };

  const addModule = pIndex => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules.push({ title: '', lessons: [] });
    setForm({ ...form, phases: newPhases });
  };

  const removeModule = (pIndex, mIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules.splice(mIndex, 1);
    setForm({ ...form, phases: newPhases });
  };

  const addLesson = (pIndex, mIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules[mIndex].lessons.push({ title: '' });
    setForm({ ...form, phases: newPhases });
  };

  const removeLesson = (pIndex, mIndex, lIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules[mIndex].lessons.splice(lIndex, 1);
    setForm({ ...form, phases: newPhases });
  };

  if (fetching) {
    return <div className='flex justify-center items-center h-screen text-gray-500'>Fetching skill data...</div>;
  }

  if (success) {
    return <Navigate to='/skills' replace />;
  }

  if (!form.title) {
    return <div>Skill Not Found</div>
  }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Edit Skill</h2>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <input
          type='text'
          placeholder='Skill title'
          className='input input-bordered w-full'
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder='Description'
          className='textarea textarea-bordered w-full'
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type='text'
          placeholder='Tags (comma separated)'
          className='input input-bordered w-full'
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
        />

        <section className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-700'>Phases</h3>

          {form.phases.map((phase, pIndex) => (
            <div key={pIndex} className='border border-gray-200 rounded-lg p-4 space-y-3'>
              <div className='flex justify-between items-center'>
                <h4 className='font-semibold text-gray-700'>Phase {pIndex + 1}</h4>
                <button type='button' onClick={() => removePhase(pIndex)} className='btn btn-sm btn-error'>
                  Remove
                </button>
              </div>

              <input
                type='text'
                placeholder='Phase title'
                className='input input-bordered w-full'
                value={phase.title}
                onChange={e => {
                  const newPhases = [...form.phases];
                  newPhases[pIndex].title = e.target.value;
                  setForm({ ...form, phases: newPhases });
                }}
              />

              <input
                type='text'
                placeholder='Phase description'
                className='input input-bordered w-full'
                value={phase.description}
                onChange={e => {
                  const newPhases = [...form.phases];
                  newPhases[pIndex].description = e.target.value;
                  setForm({ ...form, phases: newPhases });
                }}
              />

              {phase.modules.map((module, mIndex) => (
                <div key={mIndex} className='bg-gray-50 border rounded-lg p-3 space-y-2'>
                  <div className='flex justify-between items-center'>
                    <h5 className='font-medium text-gray-600'>Module {mIndex + 1}</h5>
                    <button type='button' onClick={() => removeModule(pIndex, mIndex)} className='btn btn-xs btn-error'>
                      Remove
                    </button>
                  </div>

                  <input
                    type='text'
                    placeholder='Module title'
                    className='input input-bordered w-full'
                    value={module.title}
                    onChange={e => {
                      const newPhases = [...form.phases];
                      newPhases[pIndex].modules[mIndex].title = e.target.value;
                      setForm({ ...form, phases: newPhases });
                    }}
                  />

                  {module.lessons.map((lesson, lIndex) => (
                    <div key={lIndex} className='flex gap-2 items-center'>
                      <input
                        type='text'
                        placeholder='Lesson title'
                        className='input input-bordered flex-1'
                        value={lesson.title}
                        onChange={e => {
                          const newPhases = [...form.phases];
                          newPhases[pIndex].modules[mIndex].lessons[lIndex].title = e.target.value;
                          setForm({ ...form, phases: newPhases });
                        }}
                      />
                      <button type='button' onClick={() => removeLesson(pIndex, mIndex, lIndex)} className='btn btn-xs btn-error'>
                        ✕
                      </button>
                    </div>
                  ))}

                  <button type='button' onClick={() => addLesson(pIndex, mIndex)} className='btn btn-sm btn-outline btn-info mt-2'>
                    + Add Lesson
                  </button>
                </div>
              ))}

              <button type='button' onClick={() => addModule(pIndex)} className='btn btn-sm btn-outline btn-accent mt-2'>
                + Add Module
              </button>
            </div>
          ))}

          <button type='button' onClick={addPhase} className='btn btn-outline btn-primary mt-3'>
            + Add Phase
          </button>
        </section>

        <button type='submit' disabled={isLoading} className='btn btn-primary w-full mt-5'>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
