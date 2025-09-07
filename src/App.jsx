import { Dashboard } from "./components/Dashboard";



function App() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">Dynamic Dashboard</h1>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
          <h1 className="text-sm py-4 text-center text-white bg-black font-semibold">Developed by Durga Prasanna U</h1>
    </div>
  );
};

export default App;