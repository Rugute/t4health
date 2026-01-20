import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import Cookies from "js-cookie";

import UserList from "../components/UserList";
import PatientList from "../components/PatientList";
import NewPatient from "../components/RegisterPatient";
import NewUser from "../components/RegisterUser";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [patientView, setPatientView] = useState("list"); // list | new
  const [selectedUser, setSelectedUser] = useState(null);

  const user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : { name: "User" };

  const renderContent = () => {
    switch (activePage) {
      case "patients":
        return patientView === "list" ? (
          <PatientList onAddNew={() => setPatientView("new")} />
        ) : (
          <NewPatient onBack={() => setPatientView("list")} />
        );

      case "users":
        return patientView === "list" ? (
          <UserList
            onAddNew={() => {
              setSelectedUser(null);
              setPatientView("new");
            }}
            onView={(user) => {
              setSelectedUser(user);
              setPatientView("new");
            }}
          />
        ) : (
          <NewUser
            user={selectedUser}
            onBack={() => setPatientView("list")}
          />
        );

      case "symptoms":
        return <div>Symptoms module coming here</div>;

      case "diagnosis":
        return <div>Diagnosis module coming here</div>;

      default:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
            <p className="text-gray-600">
              Welcome to T4Health system dashboard.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r md:block ${sidebarOpen ? "block" : "hidden"
          }`}
      >
        <div className="h-16 flex items-center px-6 font-bold text-xl border-b">
          T4Health
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activePage === "dashboard"
              ? "bg-gray-200 font-medium"
              : "hover:bg-gray-100"
              }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setActivePage("patients");
              setPatientView("list");
            }}
            className={`w-full text-left px-4 py-2 rounded-lg ${activePage === "patients"
              ? "bg-gray-200 font-medium"
              : "hover:bg-gray-100"
              }`}
          >
            Patients
          </button>

          <button
            onClick={() => setActivePage("users")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activePage === "users"
              ? "bg-gray-200 font-medium"
              : "hover:bg-gray-100"
              }`}
          >
            Users
          </button>

          <button
            onClick={() => setActivePage("symptoms")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activePage === "symptoms"
              ? "bg-gray-200 font-medium"
              : "hover:bg-gray-100"
              }`}
          >
            Symptoms
          </button>

          <button
            onClick={() => setActivePage("diagnosis")}
            className={`w-full text-left px-4 py-2 rounded-lg ${activePage === "diagnosis"
              ? "bg-gray-200 font-medium"
              : "hover:bg-gray-100"
              }`}
          >
            Diagnosis
          </button>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold capitalize">
              {activePage}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5" />

            <div className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <span className="hidden sm:block text-sm font-medium">
                {user.name}
              </span>
              <button
                onClick={() => {
                  Cookies.remove("user");
                  window.location.href = "/signin";
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
          <div className="border border-dashed rounded-xl p-6 bg-white">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
