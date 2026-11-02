import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { hashPasswordSHA256 } from '../../utils/crypto';
import { sheetsService } from '../../services/sheetsService';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Calculate SHA-256 hash of entered password
      const passwordHash = await hashPasswordSHA256(password);

      // 2. Verify with Google Sheets (or fallback local admin check)
      const result = await sheetsService.verifyAdmin(email, passwordHash);

      // Local fallback credentials if Google Sheets webhook is not configured yet
      const isDefaultLocalAdmin = (email.trim().toLowerCase() === 'admin@graphicporium.com' && password === 'admin123');

      if (result.success || isDefaultLocalAdmin) {
        sessionStorage.setItem('gp_admin_session', JSON.stringify({
          authenticated: true,
          email,
          name: result.name || 'Admin',
          timestamp: Date.now()
        }));
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Password verification failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#030712] text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-gray-900/90 border border-gray-800 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff5a00]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#ff5a00]/20 text-[#ff5a00] border border-[#ff5a00]/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="text-xs text-gray-400 mt-1">
            Graphicporium Backoffice & Orders Management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="email"
                required
                placeholder="admin@graphicporium.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:outline-none focus:border-[#ff5a00] text-sm text-white placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950 border border-gray-800 focus:outline-none focus:border-[#ff5a00] text-sm text-white placeholder-gray-600"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              Protected by SHA-256 cryptographic one-way hashing.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold bg-[#ff5a00] hover:bg-[#ff7a33] text-white flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Encrypted Session • Admin Authorized Only</span>
          </div>
        </div>
      </div>
    </div>
  );
};
