import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import Cookies from 'js-cookie';
import UserList from "../components/UserList";
//import Symptoms from "Symptoms";


export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : { name: 'User' };


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r flex flex-col md:flex ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="h-16 flex items-center px-6 font-bold text-xl border-b">
          T4Health
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-gray-100 font-medium" >Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100" >Users</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100" >Patients</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100" >Symptoms</a>
          <a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-100" >Diagnosis</a>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <User className="w-6 h-6 rounded-full border" />
                <span className="hidden sm:block text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  Cookies.remove('user');
                  window.location.href = '/signin';
                }}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="border border-dashed rounded-xl p-6 text-gray-500">
            <UserList />
          </div>
        </main>
      </div>
    </div>
  );
}
