import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  BookOpen, 
  Users, 
  RotateCcw, 
  Search, 
  LogOut, 
  ExternalLink, 
  FileSpreadsheet, 
  Check, 
  ShieldCheck,
  HelpCircle,
  Copy
} from 'lucide-react';
import { Order } from '../../types/ecommerce';
import { orderService } from '../../services/orderService';
import { sheetsService } from '../../services/sheetsService';

interface AdminDashboardPageProps {
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSavedUrl, setIsSavedUrl] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    loadOrders();
    setWebhookUrl(sheetsService.getWebhookUrl());
  }, []);

  const loadOrders = () => {
    setOrders(orderService.getAllOrders());
  };

  const handleResetDownload = (orderId: string) => {
    const success = orderService.resetDownloadLimit(orderId);
    if (success) {
      loadOrders();
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    sheetsService.setWebhookUrl(webhookUrl);
    setIsSavedUrl(true);
    setTimeout(() => setIsSavedUrl(false), 3000);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const totalSold = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;

  // Filtered orders
  const filteredOrders = orders.filter(o => 
    o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.ebookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const googleAppsScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var payload = JSON.parse(e.postData.contents);
  
  if (payload.action === 'create_order') {
    var data = payload.data;
    sheet.appendRow([
      data.orderId,
      data.customerName,
      data.customerEmail,
      data.ebookTitle,
      data.amount,
      data.paymentId,
      data.createdAt
    ]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var action = e.parameter.action;
  if (action === 'verify_admin') {
    var email = e.parameter.email;
    var hash = e.parameter.hash;
    // Check against 'Admins' sheet or your master hash
    return ContentService.createTextOutput(JSON.stringify({ success: true, name: 'Admin' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 p-4 md:p-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Admin Management Portal</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Live
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Graphicporium E-Book Orders, Single-Use Tokens & Support
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center gap-1.5 transition"
          >
            View Live Site
            <ExternalLink size={14} />
          </a>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 flex items-center gap-1.5 transition"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 space-y-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#ff5a00]/20 text-[#ff5a00] flex items-center justify-center shrink-0">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-black text-white mt-0.5">₹{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total E-Books Sold</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{totalSold}</h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Total Customers</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{uniqueCustomers}</h3>
            </div>
          </div>
        </div>

        {/* Google Sheets Sync Card */}
        <div className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="text-emerald-400" size={24} />
              <div>
                <h3 className="text-base font-bold text-white">Google Sheets Integration</h3>
                <p className="text-xs text-gray-400">
                  Connect your Google Sheet via Webhook URL to sync orders and authenticate users automatically.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowScriptModal(true)}
              className="text-xs font-medium text-[#ff5a00] hover:text-[#ff7a33] flex items-center gap-1.5 self-start md:self-auto"
            >
              <HelpCircle size={14} />
              How to setup Google Sheet Webhook?
            </button>
          </div>

          <form onSubmit={handleSaveWebhook} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:outline-none focus:border-[#ff5a00] text-xs text-white"
            />
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#ff5a00] hover:bg-[#ff7a33] text-white flex items-center justify-center gap-2 transition"
            >
              {isSavedUrl ? <Check size={16} /> : null}
              {isSavedUrl ? 'Saved!' : 'Save Sheet URL'}
            </button>
          </form>
        </div>

        {/* Orders Table Section */}
        <div className="rounded-2xl bg-gray-900 border border-gray-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Customer Orders & Licenses</h2>
              <p className="text-xs text-gray-400">
                Manage one-time downloads and track anti-piracy stamped licenses.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search orders, emails, books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-950 border border-gray-800 focus:outline-none focus:border-[#ff5a00] text-xs text-white"
              />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No orders recorded yet.</p>
              <p className="text-xs text-gray-500 mt-1">
                Completed purchases from the `/ebooks` page will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-950/70 text-gray-400 font-semibold border-b border-gray-800 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Order ID</th>
                    <th className="py-3.5 px-6">Customer</th>
                    <th className="py-3.5 px-6">E-Book Title</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Download Status</th>
                    <th className="py-3.5 px-6 text-right">Support Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {filteredOrders.map((order) => {
                    const isLimitReached = order.downloadCount >= order.maxDownloads;
                    return (
                      <tr key={order.orderId} className="hover:bg-gray-800/30 transition">
                        <td className="py-4 px-6 font-mono font-bold text-white">
                          #{order.orderId}
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-white">{order.customerName}</div>
                          <div className="text-gray-400 text-[11px]">{order.customerEmail}</div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-200">
                          {order.ebookTitle}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#ff5a00]">
                          ₹{order.amount}
                        </td>
                        <td className="py-4 px-6">
                          {isLimitReached ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px]">
                              Used ({order.downloadCount}/{order.maxDownloads})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                              Available ({order.downloadCount}/{order.maxDownloads})
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleResetDownload(order.orderId)}
                            title="Reset limit to give customer 1 more download"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-[11px] transition"
                          >
                            <RotateCcw size={12} className="text-[#ff5a00]" />
                            Reset 1 Download
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Google Apps Script Modal Guide */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-gray-900 border border-gray-800 p-6 shadow-2xl relative text-left">
            <h3 className="text-lg font-bold text-white mb-2">Google Sheets Webhook Setup</h3>
            <p className="text-xs text-gray-400 mb-4">
              Follow these 3 quick steps to connect your private Google Sheet:
            </p>
            <ol className="text-xs text-gray-300 space-y-2 mb-4 list-decimal pl-5">
              <li>Open a Google Sheet, click <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
              <li>Paste the code snippet below and click <strong>Deploy</strong> &gt; <strong>New deployment</strong>.</li>
              <li>Select type <strong>Web app</strong>, set <em>Who has access</em> to <strong>Anyone</strong>, and copy the deployment URL into the box above.</li>
            </ol>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-[11px] text-gray-300 overflow-x-auto max-h-56">
                {googleAppsScriptCode}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(googleAppsScriptCode);
                  setCopiedScript(true);
                  setTimeout(() => setCopiedScript(false), 2000);
                }}
                className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 flex items-center gap-1.5"
              >
                {copiedScript ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copiedScript ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#ff5a00] text-white"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
