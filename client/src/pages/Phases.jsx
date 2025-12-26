export default function Phases(ind, phase) {
  return (
    <section className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Phase {ind} - {phase.title}
      </h2>
      <div className="min-h-fit border border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold text-green-900">{phase.description}</h1>
            </header>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></section>
          </div>
        </main>
      </div>
    </section>
  );
}
