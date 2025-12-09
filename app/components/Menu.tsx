export default function Menu() {
  const menuItems = [
    { id: 1, label: "Home", icon: "🏠" },
    { id: 2, label: "Mining", icon: "⛏️" },
		{ id: 3, label: "Woodcutting", icon: "🪓" },
    { id: 4, label: "Settings", icon: "⚙️" },
    { id: 5, label: "Profile", icon: "👤" },
    { id: 6, label: "Help", icon: "❓" },
  ];

  return (
    <nav className="bg-slate-900 text-white h-full p-6 shadow-lg flex flex-col gap-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-left w-full cursor-pointer"
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
