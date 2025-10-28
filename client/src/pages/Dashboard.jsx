import SkillCard from '../component/SkillCard';

 function Dashboard() {
   const mock = [
     { title: 'JavaScript Fundamentals', desc: 'Syntax, arrays, objects, ES6+', percent: 70, tags: ['JS', 'Core'] },
     { title: 'React Basics', desc: 'Hooks, components, props/state', percent: 45, tags: ['React'] },
     { title: 'Data Structures', desc: 'Trees, graphs, maps', percent: 25, tags: ['CS'] },
   ];
   return (
     <div className='space-y-6'>
       <header>
         <h1 className='text-2xl font-bold'>Dashboard</h1>
         <p className='text-sm text-gray-500'>Your active branches and progress</p>
       </header>

       <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
         {mock.map(m => (
           <SkillCard key={m.title} {...m} />
         ))}
       </section>
     </div>
   );
 }

 export default Dashboard;