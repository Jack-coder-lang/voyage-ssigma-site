import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SettingsTabs } from "@/components/admin/settings-tabs"

export default function AdminSettingsPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
              <p className="text-gray-600 dark:text-gray-300">Gérez les paramètres de votre site de voyage</p>
            </div>
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  )
}
