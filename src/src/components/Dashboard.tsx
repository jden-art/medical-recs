import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Calendar, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const SidebarItem = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean,
  onClick?: () => void
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 cursor-pointer group transition-all rounded-2xl ${active ? 'bg-[#0A84FF] text-white' : 'hover:bg-white/5 text-[#94A3B8] hover:text-[#F1F5F9]'}`}
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </div>
);

type Tab = 'overview' | 'profile' | 'records' | 'appointments' | 'settings';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-12 gap-6">
            {/* Main Chart */}
            <div className="col-span-12 lg:col-span-8 frosted-panel p-8 rounded-[40px] h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Health Score Index</h3>
                  <p className="text-sm text-[#94A3B8]">Aggregate of biometric markers</p>
                </div>
                <div className="flex items-center gap-2 text-[#30D158]">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="font-bold">+12%</span>
                </div>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0A84FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#94A3B8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#94A3B8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(29, 33, 41, 0.9)', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                      itemStyle={{ color: '#F1F5F9' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0A84FF" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="frosted-panel p-6 rounded-[32px] flex-1">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1">Blood Pressure</p>
                  <h4 className="text-3xl font-bold mb-4">120/80 <span className="text-sm font-normal text-[#94A3B8]">mmHg</span></h4>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#30D158] w-[70%]" />
                  </div>
              </div>
              <div className="frosted-panel p-6 rounded-[32px] flex-1">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1">Blood Glucose</p>
                  <h4 className="text-3xl font-bold mb-4">98 <span className="text-sm font-normal text-[#94A3B8]">mg/dL</span></h4>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A84FF] w-[45%]" />
                  </div>
              </div>
            </div>

            {/* AI Summary Widget */}
            <div className="col-span-12 lg:col-span-4 frosted-panel p-8 rounded-[40px]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0A84FF] rounded-full animate-pulse" />
                  AI Health Insight
              </h3>
              <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-[#94A3B8]">
                      Based on your recent labs from <span className="text-[#F1F5F9] font-medium">Apollo Hospital</span>, your cholesterol levels have improved significantly following the new dietary regimen.
                  </p>
                  <p className="text-sm leading-relaxed text-[#94A3B8]">
                      Recommendation: Maintain current activity levels. Schedule a follow-up Vitamin D screening in 3 months.
                  </p>
                  <button className="w-full py-3 bg-white/5 rounded-2xl text-sm font-semibold hover:bg-white/10 transition-colors">
                      View Full Report
                  </button>
              </div>
            </div>

            {/* Recent Records Table Shortlist */}
            <div className="col-span-12 lg:col-span-8 frosted-panel p-8 rounded-[40px]">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Records</h3>
                  <button onClick={() => setActiveTab('records')} className="flex items-center gap-2 text-sm font-semibold text-[#0A84FF]">
                      View All
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="border-b border-white/5">
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Document Name</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Provider</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Date</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {[
                              { name: "Blood Morphology Report", provider: "Apollo Lab", date: "Oct 12, 2025" },
                              { name: "Chest X-Ray Analysis", provider: "Fortis Health", date: "Sep 28, 2025" },
                          ].map((row, i) => (
                              <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                                  <td className="py-4 font-medium">{row.name}</td>
                                  <td className="py-4 text-[#94A3B8]">{row.provider}</td>
                                  <td className="py-4 text-[#94A3B8] text-sm">{row.date}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
               </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="frosted-panel p-8 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-8">Personal Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm text-[#94A3B8]">Full Name</label>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">John Doe</div>
                  
                  <label className="block text-sm text-[#94A3B8]">Aadhaar Number</label>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">XXXX-XXXX-1234</div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm text-[#94A3B8]">Date of Birth</label>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">January 15, 1985</div>
                  
                  <label className="block text-sm text-[#94A3B8]">Blood Group</label>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10">O Positive</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'records':
        return (
          <div className="space-y-6">
            <div className="frosted-panel p-8 rounded-[40px]">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Medical Records</h3>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#0A84FF] text-white rounded-2xl font-bold hover:bg-[#0A84FF]/90 transition-colors">
                      <Plus className="w-5 h-5" /> Add New Record
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead>
                          <tr className="border-b border-white/5">
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Document Name</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Provider</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Date</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Status</th>
                              <th className="pb-4 font-semibold text-sm text-[#94A3B8]">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {[
                              { name: "Blood Morphology Report", provider: "Apollo Lab", date: "Oct 12, 2025", status: "Verified" },
                              { name: "Chest X-Ray Analysis", provider: "Fortis Health", date: "Sep 28, 2025", status: "Analyzed" },
                              { name: "Vaccination Record", provider: "Govt. Clinic", date: "Aug 15, 2025", status: "Verified" },
                              { name: "Dental Checkup", provider: "Clove Dental", date: "July 10, 2025", status: "Verified" },
                              { name: "MRI Brain", provider: "City Scans", date: "June 05, 2025", status: "Verified" }
                          ].map((row, i) => (
                              <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                                  <td className="py-4 font-medium">{row.name}</td>
                                  <td className="py-4 text-[#94A3B8]">{row.provider}</td>
                                  <td className="py-4 text-[#94A3B8] text-sm">{row.date}</td>
                                  <td className="py-4">
                                      <span className="px-3 py-1 bg-[#30D158]/10 text-[#30D158] text-xs font-bold rounded-full">
                                          {row.status}
                                      </span>
                                  </td>
                                  <td className="py-4">
                                      <button className="text-[#0A84FF] text-sm font-semibold">View</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
               </div>
            </div>
          </div>
        );
      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="frosted-panel p-8 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-8">Upcoming Appointments</h3>
              <div className="space-y-4">
                {[
                  { doctor: "Dr. Sarah Smith", specialty: "Cardiologist", date: "Oct 24, 2025", time: "10:30 AM", status: "Confirmed" },
                  { doctor: "Dr. James Wilson", specialty: "Dermatologist", date: "Nov 02, 2025", time: "02:15 PM", status: "Pending" }
                ].map((apt, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#0A84FF]/20 flex items-center justify-center text-[#0A84FF]">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{apt.doctor}</h4>
                        <p className="text-sm text-[#94A3B8]">{apt.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{apt.date}</p>
                      <p className="text-sm text-[#94A3B8]">{apt.time}</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl text-sm font-semibold">
                      {apt.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="frosted-panel p-8 rounded-[40px]">
              <h3 className="text-2xl font-bold mb-8">Account Settings</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Security</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <span>Two-Factor Authentication</span>
                      <div className="w-12 h-6 bg-[#30D158] rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <span>Biometric Login</span>
                      <div className="w-12 h-6 bg-[#30D158] rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Notifications</h4>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <span>Appointment Reminders</span>
                      <div className="w-12 h-6 bg-[#30D158] rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-transparent p-6 gap-6 pt-24 overflow-hidden">
      {/* Sidebar - Tesla style: icons primary, text on hover/expand */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="frosted-panel w-20 hover:w-64 transition-all duration-500 overflow-hidden flex flex-col items-center py-8 rounded-[32px] z-50 group"
      >
        <div className="flex flex-col gap-4 w-full px-4">
          <SidebarItem 
            icon={<LayoutDashboard />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          />
          <SidebarItem 
            icon={<User />} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
          <SidebarItem 
            icon={<FileText />} 
            label="Records" 
            active={activeTab === 'records'} 
            onClick={() => setActiveTab('records')}
          />
          <SidebarItem 
            icon={<Calendar />} 
            label="Appointments" 
            active={activeTab === 'appointments'} 
            onClick={() => setActiveTab('appointments')}
          />
          <SidebarItem 
            icon={<Settings />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </motion.aside>

      {/* Main Baseplate */}
      <main className="flex-1 overflow-y-auto pr-2 space-y-6">
        {/* Header Widget Area */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {activeTab === 'overview' ? 'Welcome back, John' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-[#94A3B8]">
              {activeTab === 'overview' ? 'Your health metrics are stable this month.' : `Manage your ${activeTab} and information.`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-6 py-2 focus:outline-none focus:border-[#0A84FF] transition-all w-64"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A84FF] to-[#30D158] p-px cursor-pointer"
              onClick={() => setActiveTab('profile')}
            >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" />
                </div>
            </div>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
