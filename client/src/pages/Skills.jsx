function Skills() {
  return (
    <main className='flex-1 p-4'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <section className='lg:col-span-2 bg-base-200 rounded-box p-4'>
          {/* Skill branches / tracking map placeholder */}
          <h2 className='text-lg font-bold mb-2'>Skill Map</h2>
          <div className='h-64 border border-dashed border-neutral rounded-lg flex items-center justify-center'>Map will go here</div>
        </section>

        <aside className='bg-base-200 rounded-box p-4'>
          {/* Sidebar / extra info */}
          <h2 className='text-lg font-bold mb-2'>Stats</h2>
          <p>Your progress and insights here</p>
        </aside>
      </div>
    </main>
  );
}

export default Skills;
