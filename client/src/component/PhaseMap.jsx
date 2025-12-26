export default function PhaseMap(data) {
  const skill = data.skill;
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-green-900">{skill.title}</h1>
        </header>
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></section>
      </div>
    </main>
  );
}
