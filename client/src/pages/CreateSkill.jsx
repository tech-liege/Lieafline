import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSkill } from '../services/skillApi';
import { useAuth, useVar } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function CreateSkill() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    phases: [],
  });

  const navigate = useNavigate();

  const { token, SKILL_SERVER_URL } = useAuth();
  const { loading, toggleLoading } = useVar();

  const handleSubmit = async e => {
    e.preventDefault();
    toggleLoading(true);

    if (!form.title || !form.description || !form.tags) {
      toast.error('Title, description, and tags are required');
      toggleLoading(false);
      return;
    }

    try {
      const tagsArray = form.tags.split(',').map(tag => tag.trim());
      const data = await createSkill(SKILL_SERVER_URL, token, {
        ...form,
        tags: tagsArray,
      });
      if (data.message === 'success') {
        toast.success('Skill created successfully!');
        navigate('/skills');
      }
    } catch (error) {
      toast.error('Skill creation failed. Check network.');
      console.error(error);
    } finally {
      toggleLoading(false);
    }
  };

  // === Nested structure functions ===
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
    newPhases[pIndex].modules[mIndex].lessons.push({ title: '', description: '', tasks: [] });
    setForm({ ...form, phases: newPhases });
  };

  const removeLesson = (pIndex, mIndex, lIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules[mIndex].lessons.splice(lIndex, 1);
    setForm({ ...form, phases: newPhases });
  };

  const addTask = (pIndex, mIndex, lIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules[mIndex].lessons[lIndex].tasks.push({ title: '' });
    setForm({ ...form, phases: newPhases });
  };

  const removeTask = (pIndex, mIndex, lIndex, tIndex) => {
    const newPhases = [...form.phases];
    newPhases[pIndex].modules[mIndex].lessons[lIndex].tasks.splice(tIndex, 1);
    setForm({ ...form, phases: newPhases });
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Create New Skill</h2>

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
                      <input
                        type='text'
                        placeholder='Lesson description'
                        className='input input-bordered flex-1'
                        value={lesson.description}
                        onChange={e => {
                          const newPhases = [...form.phases];
                          newPhases[pIndex].modules[mIndex].lessons[lIndex].description = e.target.value;
                          setForm({ ...form, phases: newPhases });
                        }}
                      />
                      <button type='button' onClick={() => removeLesson(pIndex, mIndex, lIndex)} className='btn btn-xs btn-error'>
                        ✕
                      </button>
                      {lesson.tasks.map((task, tIndex) => {
                        <div key={tIndex} className='flex gap-2 items-center'>
                          <input
                            type='text'
                            placeholder='Lesson title'
                            className='input input-bordered flex-1'
                            value={task.title}
                            onChange={e => {
                              const newPhases = [...form.phases];
                              newPhases[pIndex].modules[mIndex].lessons[lIndex].tasks[tIndex].title = e.target.value;
                              setForm({ ...form, phases: newPhases });
                            }}
                          />
                          <button type='button' onClick={() => removeTask(pIndex, mIndex, lIndex, tIndex)} className='btn btn-xs btn-error'>
                            ✕
                          </button>
                        </div>;
                      })}
                      <button
                        type='button'
                        onClick={() => addTask(pIndex, mIndex, lIndex)}
                        className='btn btn-sm btn-outline btn-info mt-2'>
                        + Add Task
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

        <button type='submit' disabled={loading} className='btn btn-primary w-full mt-5'>
          {loading ? 'Creating...' : 'Create Skill'}
        </button>
      </form>
    </div>
  );
}
