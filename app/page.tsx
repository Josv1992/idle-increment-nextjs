import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import ButtonGrid from "./components/ButtonGrid";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-100 font-sans dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-red from-slate-800 to-slate-900 h-16 shadow-lg flex items-center px-6">
        <h1 className="text-3xl font-bold text-white">Idle Increment</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Menu */}
        <div className="w-64 border-r border-slate-300 dark:border-slate-700">
          <Menu />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8 flex flex-col gap-8 overflow-auto">
          {/* Gallery Section */}
          <Gallery />

          {/* Button Grid Section */}
          <ButtonGrid />
        </div>
      </div>
    </main>
  );
}
