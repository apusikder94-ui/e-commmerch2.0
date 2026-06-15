"use client";

import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Bell,
  Shield,
  Moon,
  Smartphone,
  Package,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

// Custom Switch Component
const ToggleSwitch = ({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <button
        type="button"
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${enabled ? "bg-indigo-600" : "bg-gray-200"}
        `}
        onClick={onChange}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

// Mock Orders Data
const ordersData = [
  {
    id: "ORD-001",
    date: "2024-02-15",
    total: 129.99,
    status: "Delivered",
    items: 3,
    statusColor: "bg-green-100 text-green-800",
    statusIcon: CheckCircle,
  },
  {
    id: "ORD-002",
    date: "2024-02-01",
    total: 49.99,
    status: "Shipped",
    items: 1,
    statusColor: "bg-blue-100 text-blue-800",
    statusIcon: Truck,
  },
  {
    id: "ORD-003",
    date: "2024-01-20",
    total: 89.99,
    status: "Processing",
    items: 2,
    statusColor: "bg-yellow-100 text-yellow-800",
    statusIcon: Clock,
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const menuItems = [
    { id: "account", label: "My Account", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Manage your account and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* LEFT SIDEBAR */}
          <div className="md:col-span-1">
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      whitespace-nowrap md:whitespace-normal
                      ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-600 md:border-l-4 md:border-r-0"
                          : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent"
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Account Content */}
              {activeTab === "account" && (
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                          <div className="h-full w-full rounded-full bg-white p-0.5">
                            <img
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                              alt="Profile"
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-50 transition">
                          <Edit2 className="h-3.5 w-3.5 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Apu Sikder
                        </h2>
                        <p className="text-gray-600">apu.sikder@example.com</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Member since Jan 2024
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm">
                      Edit Profile
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="text-gray-900 font-medium">
                            apu.sikder@example.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-gray-900 font-medium">
                            +880 1234 567890
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-gray-900 font-medium">
                            Dhaka, Bangladesh
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Birthday</p>
                          <p className="text-gray-900 font-medium">
                            May 15, 1995
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Account Statistics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          $1,234
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Reward Points</p>
                        <p className="text-2xl font-bold text-gray-900">2,450</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Content */}
              {activeTab === "orders" && (
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      My Orders
                    </h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {ordersData.map((order) => {
                      const StatusIcon = order.statusIcon;
                      return (
                        <div
                          key={order.id}
                          className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-semibold text-gray-900">
                                  {order.id}
                                </h3>
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}
                                >
                                  <StatusIcon className="h-3 w-3" />
                                  {order.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{order.date}</span>
                                <span>{order.items} items</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-6">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Total Amount
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  ${order.total.toFixed(2)}
                                </p>
                              </div>
                              <button className="px-4 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Settings Content */}
              {activeTab === "settings" && (
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Settings
                  </h2>

                  <div className="space-y-8">
                    {/* Notification Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-indigo-600" />
                        Notifications
                      </h3>
                      <div className="space-y-4 bg-gray-50 rounded-xl p-5">
                        <ToggleSwitch
                          enabled={emailNotifications}
                          onChange={() =>
                            setEmailNotifications(!emailNotifications)
                          }
                          label="Email Notifications"
                        />
                        <ToggleSwitch
                          enabled={smsNotifications}
                          onChange={() => setSmsNotifications(!smsNotifications)}
                          label="SMS Notifications"
                        />
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-indigo-600" />
                        Security
                      </h3>
                      <div className="space-y-4 bg-gray-50 rounded-xl p-5">
                        <ToggleSwitch
                          enabled={twoFactor}
                          onChange={() => setTwoFactor(!twoFactor)}
                          label="Two-Factor Authentication"
                        />
                        <button className="w-full text-left px-0 py-2 text-indigo-600 hover:text-indigo-700 font-medium">
                          Change Password →
                        </button>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Moon className="h-5 w-5 text-indigo-600" />
                        Preferences
                      </h3>
                      <div className="space-y-4 bg-gray-50 rounded-xl p-5">
                        <ToggleSwitch
                          enabled={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                          label="Dark Mode (Coming Soon)"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select className="w-full md:w-64 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>English</option>
                            <option>Bengali</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                      Save All Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;