"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
// Custom Switch Component
var ToggleSwitch = function (_a) {
    var enabled = _a.enabled, onChange = _a.onChange, label = _a.label;
    return (react_1["default"].createElement("div", { className: "flex items-center justify-between" },
        react_1["default"].createElement("span", { className: "text-gray-700" }, label),
        react_1["default"].createElement("button", { type: "button", className: "\n          relative inline-flex h-6 w-11 items-center rounded-full transition-colors\n          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2\n          " + (enabled ? "bg-indigo-600" : "bg-gray-200") + "\n        ", onClick: onChange },
            react_1["default"].createElement("span", { className: "\n            inline-block h-4 w-4 transform rounded-full bg-white transition-transform\n            " + (enabled ? "translate-x-6" : "translate-x-1") + "\n          " }))));
};
// Mock Orders Data
var ordersData = [
    {
        id: "ORD-001",
        date: "2024-02-15",
        total: 129.99,
        status: "Delivered",
        items: 3,
        statusColor: "bg-green-100 text-green-800",
        statusIcon: lucide_react_1.CheckCircle
    },
    {
        id: "ORD-002",
        date: "2024-02-01",
        total: 49.99,
        status: "Shipped",
        items: 1,
        statusColor: "bg-blue-100 text-blue-800",
        statusIcon: lucide_react_1.Truck
    },
    {
        id: "ORD-003",
        date: "2024-01-20",
        total: 89.99,
        status: "Processing",
        items: 2,
        statusColor: "bg-yellow-100 text-yellow-800",
        statusIcon: lucide_react_1.Clock
    },
];
var Page = function () {
    var _a = react_1.useState("account"), activeTab = _a[0], setActiveTab = _a[1];
    var _b = react_1.useState(true), emailNotifications = _b[0], setEmailNotifications = _b[1];
    var _c = react_1.useState(false), smsNotifications = _c[0], setSmsNotifications = _c[1];
    var _d = react_1.useState(false), darkMode = _d[0], setDarkMode = _d[1];
    var _e = react_1.useState(false), twoFactor = _e[0], setTwoFactor = _e[1];
    var menuItems = [
        { id: "account", label: "My Account", icon: lucide_react_1.User },
        { id: "orders", label: "My Orders", icon: lucide_react_1.ShoppingBag },
        { id: "settings", label: "Settings", icon: lucide_react_1.Settings },
    ];
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" },
        react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" },
            react_1["default"].createElement("div", { className: "mb-8 md:mb-12" },
                react_1["default"].createElement("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900" }, "My Dashboard"),
                react_1["default"].createElement("p", { className: "text-gray-600 mt-2" }, "Manage your account and orders")),
            react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8" },
                react_1["default"].createElement("div", { className: "md:col-span-1" },
                    react_1["default"].createElement("nav", { className: "flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0" }, menuItems.map(function (item) {
                        var Icon = item.icon;
                        var isActive = activeTab === item.id;
                        return (react_1["default"].createElement("button", { key: item.id, onClick: function () { return setActiveTab(item.id); }, className: "\n                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200\n                      whitespace-nowrap md:whitespace-normal\n                      " + (isActive
                                ? "bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-600 md:border-l-4 md:border-r-0"
                                : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent") + "\n                    " },
                            react_1["default"].createElement(Icon, { className: "h-5 w-5" }),
                            react_1["default"].createElement("span", { className: "font-medium" }, item.label)));
                    }))),
                react_1["default"].createElement("div", { className: "md:col-span-3" },
                    react_1["default"].createElement("div", { className: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden" },
                        activeTab === "account" && (react_1["default"].createElement("div", { className: "p-6 md:p-8" },
                            react_1["default"].createElement("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-6" },
                                react_1["default"].createElement("div", { className: "flex items-center gap-6" },
                                    react_1["default"].createElement("div", { className: "relative" },
                                        react_1["default"].createElement("div", { className: "h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5" },
                                            react_1["default"].createElement("div", { className: "h-full w-full rounded-full bg-white p-0.5" },
                                                react_1["default"].createElement("img", { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop", alt: "Profile", className: "h-full w-full rounded-full object-cover" }))),
                                        react_1["default"].createElement("button", { className: "absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-50 transition" },
                                            react_1["default"].createElement(lucide_react_1.Edit2, { className: "h-3.5 w-3.5 text-gray-600" }))),
                                    react_1["default"].createElement("div", null,
                                        react_1["default"].createElement("h2", { className: "text-2xl font-bold text-gray-900" }, "Apu Sikder"),
                                        react_1["default"].createElement("p", { className: "text-gray-600" }, "apu.sikder@example.com"),
                                        react_1["default"].createElement("p", { className: "text-sm text-gray-500 mt-1" }, "Member since Jan 2024"))),
                                react_1["default"].createElement("button", { className: "px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm" }, "Edit Profile")),
                            react_1["default"].createElement("div", { className: "mt-8 pt-6 border-t border-gray-100" },
                                react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Personal Information"),
                                react_1["default"].createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                                    react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                        react_1["default"].createElement("div", { className: "h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center" },
                                            react_1["default"].createElement(lucide_react_1.Mail, { className: "h-5 w-5 text-indigo-600" })),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Email Address"),
                                            react_1["default"].createElement("p", { className: "text-gray-900 font-medium" }, "apu.sikder@example.com"))),
                                    react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                        react_1["default"].createElement("div", { className: "h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center" },
                                            react_1["default"].createElement(lucide_react_1.Phone, { className: "h-5 w-5 text-indigo-600" })),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Phone Number"),
                                            react_1["default"].createElement("p", { className: "text-gray-900 font-medium" }, "+880 1234 567890"))),
                                    react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                        react_1["default"].createElement("div", { className: "h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center" },
                                            react_1["default"].createElement(lucide_react_1.MapPin, { className: "h-5 w-5 text-indigo-600" })),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Address"),
                                            react_1["default"].createElement("p", { className: "text-gray-900 font-medium" }, "Dhaka, Bangladesh"))),
                                    react_1["default"].createElement("div", { className: "flex items-center gap-3" },
                                        react_1["default"].createElement("div", { className: "h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center" },
                                            react_1["default"].createElement(lucide_react_1.Calendar, { className: "h-5 w-5 text-indigo-600" })),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Birthday"),
                                            react_1["default"].createElement("p", { className: "text-gray-900 font-medium" }, "May 15, 1995"))))),
                            react_1["default"].createElement("div", { className: "mt-8 pt-6 border-t border-gray-100" },
                                react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4" }, "Account Statistics"),
                                react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
                                    react_1["default"].createElement("div", { className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4" },
                                        react_1["default"].createElement("p", { className: "text-sm text-gray-600" }, "Total Orders"),
                                        react_1["default"].createElement("p", { className: "text-2xl font-bold text-gray-900" }, "12")),
                                    react_1["default"].createElement("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4" },
                                        react_1["default"].createElement("p", { className: "text-sm text-gray-600" }, "Total Spent"),
                                        react_1["default"].createElement("p", { className: "text-2xl font-bold text-gray-900" }, "$1,234")),
                                    react_1["default"].createElement("div", { className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4" },
                                        react_1["default"].createElement("p", { className: "text-sm text-gray-600" }, "Reward Points"),
                                        react_1["default"].createElement("p", { className: "text-2xl font-bold text-gray-900" }, "2,450")))))),
                        activeTab === "orders" && (react_1["default"].createElement("div", { className: "p-6 md:p-8" },
                            react_1["default"].createElement("div", { className: "flex justify-between items-center mb-6" },
                                react_1["default"].createElement("h2", { className: "text-2xl font-bold text-gray-900" }, "My Orders"),
                                react_1["default"].createElement("button", { className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium" }, "View All")),
                            react_1["default"].createElement("div", { className: "space-y-4" }, ordersData.map(function (order) {
                                var StatusIcon = order.statusIcon;
                                return (react_1["default"].createElement("div", { key: order.id, className: "border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white" },
                                    react_1["default"].createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
                                        react_1["default"].createElement("div", { className: "space-y-2" },
                                            react_1["default"].createElement("div", { className: "flex items-center gap-3 flex-wrap" },
                                                react_1["default"].createElement("h3", { className: "font-semibold text-gray-900" }, order.id),
                                                react_1["default"].createElement("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium " + order.statusColor },
                                                    react_1["default"].createElement(StatusIcon, { className: "h-3 w-3" }),
                                                    order.status)),
                                            react_1["default"].createElement("div", { className: "flex items-center gap-4 text-sm text-gray-500" },
                                                react_1["default"].createElement("span", null, order.date),
                                                react_1["default"].createElement("span", null,
                                                    order.items,
                                                    " items"))),
                                        react_1["default"].createElement("div", { className: "flex items-center justify-between sm:justify-end gap-6" },
                                            react_1["default"].createElement("div", { className: "text-right" },
                                                react_1["default"].createElement("p", { className: "text-sm text-gray-500" }, "Total Amount"),
                                                react_1["default"].createElement("p", { className: "text-xl font-bold text-gray-900" },
                                                    "$",
                                                    order.total.toFixed(2))),
                                            react_1["default"].createElement("button", { className: "px-4 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium" }, "View Details")))));
                            })))),
                        activeTab === "settings" && (react_1["default"].createElement("div", { className: "p-6 md:p-8" },
                            react_1["default"].createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-6" }, "Settings"),
                            react_1["default"].createElement("div", { className: "space-y-8" },
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" },
                                        react_1["default"].createElement(lucide_react_1.Bell, { className: "h-5 w-5 text-indigo-600" }),
                                        "Notifications"),
                                    react_1["default"].createElement("div", { className: "space-y-4 bg-gray-50 rounded-xl p-5" },
                                        react_1["default"].createElement(ToggleSwitch, { enabled: emailNotifications, onChange: function () {
                                                return setEmailNotifications(!emailNotifications);
                                            }, label: "Email Notifications" }),
                                        react_1["default"].createElement(ToggleSwitch, { enabled: smsNotifications, onChange: function () { return setSmsNotifications(!smsNotifications); }, label: "SMS Notifications" }))),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" },
                                        react_1["default"].createElement(lucide_react_1.Shield, { className: "h-5 w-5 text-indigo-600" }),
                                        "Security"),
                                    react_1["default"].createElement("div", { className: "space-y-4 bg-gray-50 rounded-xl p-5" },
                                        react_1["default"].createElement(ToggleSwitch, { enabled: twoFactor, onChange: function () { return setTwoFactor(!twoFactor); }, label: "Two-Factor Authentication" }),
                                        react_1["default"].createElement("button", { className: "w-full text-left px-0 py-2 text-indigo-600 hover:text-indigo-700 font-medium" }, "Change Password \u2192"))),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("h3", { className: "text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" },
                                        react_1["default"].createElement(lucide_react_1.Moon, { className: "h-5 w-5 text-indigo-600" }),
                                        "Preferences"),
                                    react_1["default"].createElement("div", { className: "space-y-4 bg-gray-50 rounded-xl p-5" },
                                        react_1["default"].createElement(ToggleSwitch, { enabled: darkMode, onChange: function () { return setDarkMode(!darkMode); }, label: "Dark Mode (Coming Soon)" }),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Language"),
                                            react_1["default"].createElement("select", { className: "w-full md:w-64 px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" },
                                                react_1["default"].createElement("option", null, "English"),
                                                react_1["default"].createElement("option", null, "Bengali"),
                                                react_1["default"].createElement("option", null, "Hindi"))))),
                                react_1["default"].createElement("button", { className: "w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm" }, "Save All Changes"))))))))));
};
exports["default"] = Page;
