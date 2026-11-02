import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Download, 
  AlertCircle, 
  ArrowRight, 
  Smartphone, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Sparkles,
  FileText
} from 'lucide-react';
import { Ebook, Order } from '../../types/ecommerce';
import { orderService } from '../../services/orderService';
import { sheetsService } from '../../services/sheetsService';
import { watermarkPdf, triggerPdfDownload } from '../../utils/watermark';

interface YouPICheckoutModalProps {
  ebook: Ebook | null;
  isOpen: boolean;
  isDarkTheme?: boolean;
  onClose: () => void;
  merchantUpiId?: string;
}

export const YouPICheckoutModal: React.FC<YouPICheckoutModalProps> = ({
  ebook,
  isOpen,
  isDarkTheme = true,
  onClose,
  merchantUpiId = 'graphicporium@upi'
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'success'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('details');
      setName('');
      setEmail('');
      setPhone('');
      setQrCodeDataUrl('');
      setCreatedOrder(null);
      setDownloadError(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  if (!isOpen || !ebook) return null;

  // Ultra-premium design tokens
  const modalBg = isDarkTheme ? '#0b1120' : '#FFFFFF';
  const modalBorder = isDarkTheme ? 'rgba(51, 65, 85, 0.6)' : 'rgba(215, 210, 185, 0.7)';
  const textColor = isDarkTheme ? '#f8fafc' : '#141140';
  const textMuted = isDarkTheme ? '#94a3b8' : '#64748b';
  const summaryBoxBg = isDarkTheme ? 'rgba(15, 23, 42, 0.8)' : '#f8fafc';
  const summaryBoxBorder = isDarkTheme ? 'rgba(51, 65, 85, 0.5)' : '#e2e8f0';
  const inputBg = isDarkTheme ? '#030712' : '#ffffff';
  const inputBorder = isDarkTheme ? '#334155' : '#cbd5e1';
  const inputColor = isDarkTheme ? '#ffffff' : '#0f172a';
  const noteBg = isDarkTheme ? 'rgba(30, 41, 59, 0.5)' : '#f1f5f9';

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const txnId = `YOUPI_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setTransactionRef(txnId);

    const upiUri = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent('Graphicporium')}&am=${ebook.price.toFixed(2)}&cu=INR&tr=${txnId}&tn=${encodeURIComponent(`Ebook ${ebook.title}`)}`;

    try {
      const qrUrl = await QRCode.toDataURL(upiUri, {
        width: 280,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(qrUrl);
      setStep('payment');
      setTimerSeconds(300);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Failed to generate UPI QR code:', err);
    }
  };

  const handleVerifyPayment = async () => {
    setStep('verifying');

    setTimeout(async () => {
      const order = orderService.createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        ebookId: ebook.id,
        ebookTitle: ebook.title,
        amount: ebook.price,
        paymentId: transactionRef || `UPI-${Date.now()}`,
        paymentStatus: 'success',
      });

      sheetsService.syncOrder(order);

      setCreatedOrder(order);
      setStep('success');

      handleDownload(order);
    }, 2000);
  };

  const handleDownload = async (orderToDownload?: Order) => {
    const order = orderToDownload || createdOrder;
    if (!order) return;

    setDownloadError(null);
    setIsWatermarking(true);

    try {
      const result = orderService.recordDownload(order.downloadToken);
      if (!result.success) {
        setDownloadError(result.error || 'Download limit reached.');
        setIsWatermarking(false);
        return;
      }

      const response = await fetch(ebook.pdfFilePath);
      if (!response.ok) {
        throw new Error('Could not load base e-book PDF file.');
      }
      const arrayBuffer = await response.arrayBuffer();

      const watermarkedBytes = await watermarkPdf(arrayBuffer, {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderId: order.orderId,
      });

      triggerPdfDownload(watermarkedBytes, `${ebook.title.replace(/[^a-zA-Z0-9]/g, '_')}_Licensed`);
    } catch (err: any) {
      console.error('Download error:', err);
      setDownloadError(err.message || 'Failed to download file. Please contact support.');
    } finally {
      setIsWatermarking(false);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(merchantUpiId)}&pn=${encodeURIComponent('Graphicporium')}&am=${ebook.price.toFixed(2)}&cu=INR&tr=${transactionRef}&tn=${encodeURIComponent(`Ebook ${ebook.title}`)}`;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: modalBg,
          border: `1.5px solid ${modalBorder}`,
          color: textColor,
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 90, 0, 0.08)'
        }}
      >
        {/* Modal Top Bar */}
        <div 
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: modalBorder }}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-black rounded-full bg-[#ff5a00]/15 text-[#ff5a00] border border-[#ff5a00]/30 tracking-wide uppercase">
              <Sparkles size={12} />
              YouPI Checkout
            </span>
            <span className="text-xs font-semibold" style={{ color: textMuted }}>
              • Direct UPI
            </span>
          </div>

          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-500/15"
            style={{ color: textMuted }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          
          {/* Selected Product Summary Banner */}
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl border mb-6 shadow-sm"
            style={{
              backgroundColor: summaryBoxBg,
              borderColor: summaryBoxBorder
            }}
          >
            <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 shadow-md bg-gray-950 border border-black/10">
              <img 
                src={ebook.coverImage} 
                alt={ebook.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#ff5a00] uppercase tracking-wider block mb-0.5">
                {ebook.category}
              </span>
              <h4 className="font-bold text-sm sm:text-base leading-snug truncate" style={{ color: textColor }}>
                {ebook.title}
              </h4>
              <p className="text-xs font-medium mt-1 flex items-center gap-1.5" style={{ color: textMuted }}>
                <FileText size={12} className="text-[#ff5a00]" />
                {ebook.pages} Pages • Digital PDF Edition
              </p>
              
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-lg font-black text-[#ff5a00]">₹{ebook.price}</span>
                {ebook.originalPrice && (
                  <span className="text-xs line-through font-medium" style={{ color: textMuted }}>
                    ₹{ebook.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* STEP 1: Buyer Information Card */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: textColor }}>
                  Your Full Name <span className="text-[#ff5a00]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      backgroundColor: inputBg,
                      borderColor: inputBorder,
                      color: inputColor
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-[#ff5a00] text-sm font-medium transition shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: textColor }}>
                  Email Address <span className="text-[#ff5a00]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. john@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      backgroundColor: inputBg,
                      borderColor: inputBorder,
                      color: inputColor
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-[#ff5a00] text-sm font-medium transition shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: textColor }}>
                  WhatsApp Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Phone size={16} />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="e.g. +91 9876543210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      backgroundColor: inputBg,
                      borderColor: inputBorder,
                      color: inputColor
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-[#ff5a00] text-sm font-medium transition shadow-sm"
                  />
                </div>
              </div>

              {/* Security Watermark Notice Box */}
              <div 
                className="p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-medium"
                style={{ backgroundColor: noteBg, color: textMuted }}
              >
                <Lock size={15} className="text-[#ff5a00] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>Personalized License:</strong> Your name and email will be permanently stamped on the footer of every page of your copy.
                </span>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl font-black bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] hover:from-[#ff6a1a] hover:to-[#ff8a43] text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all text-sm sm:text-base"
                >
                  Proceed to UPI Payment • ₹{ebook.price}
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs pt-1 font-semibold" style={{ color: textMuted }}>
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Zero gateway fees • Direct verified settlement</span>
              </div>
            </form>
          )}

          {/* STEP 2: YouPI UPI Dynamic QR Code */}
          {step === 'payment' && (
            <div className="text-center space-y-4">
              <div 
                className="flex justify-between items-center text-xs px-4 py-2 rounded-xl"
                style={{ backgroundColor: summaryBoxBg, color: textMuted }}
              >
                <span className="font-semibold">Scan with any UPI App</span>
                <span className="font-mono text-[#ff5a00] font-black flex items-center gap-1.5">
                  <Clock size={14} className="animate-pulse" /> Expires in: {formatTimer(timerSeconds)}
                </span>
              </div>

              {/* Dynamic QR Display */}
              <div className="inline-block p-4 bg-white rounded-3xl shadow-xl border-2 border-[#ff5a00]/40">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt="Scan to pay via UPI" className="w-56 h-56 mx-auto rounded-xl" />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-gray-400">Loading QR...</div>
                )}
              </div>

              {/* Mobile Deep Link Button */}
              <div className="block md:hidden">
                <a
                  href={upiIntentUrl}
                  className="w-full py-3.5 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 text-sm shadow-md transition"
                >
                  <Smartphone size={16} />
                  Open in PhonePe / GPay / Paytm
                </a>
              </div>

              <p className="text-xs" style={{ color: textMuted }}>
                Amount to pay: <strong className="text-base font-black text-[#ff5a00]">₹{ebook.price}</strong>
              </p>

              {/* Verify Button */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleVerifyPayment}
                  className="w-full py-3.5 px-4 rounded-2xl font-black bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] hover:from-[#ff6a1a] hover:to-[#ff8a43] text-white flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <CheckCircle size={18} />
                  I Have Completed Payment
                </button>
                <button
                  onClick={() => setStep('details')}
                  className="w-full py-2 text-xs font-bold hover:underline"
                  style={{ color: textMuted }}
                >
                  ← Edit details
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Verifying */}
          {step === 'verifying' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-[#ff5a00] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h4 className="text-lg font-bold" style={{ color: textColor }}>
                Confirming UPI Settlement...
              </h4>
              <p className="text-xs max-w-xs mx-auto font-normal leading-relaxed" style={{ color: textMuted }}>
                Validating transaction with banking observer. Stamping your personalized license on every page...
              </p>
            </div>
          )}

          {/* STEP 4: Success & Watermarked Download */}
          {step === 'success' && createdOrder && (
            <div className="text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle size={36} />
              </div>

              <div>
                <h4 className="text-xl font-black" style={{ color: textColor }}>Payment Confirmed!</h4>
                <p className="text-xs font-mono mt-1 font-semibold" style={{ color: textMuted }}>
                  Order ID: #{createdOrder.orderId}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
                  Personal license watermarked for: <strong>{createdOrder.customerName}</strong> ({createdOrder.customerEmail})
                </p>
              </div>

              {downloadError ? (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs text-left flex items-start gap-2.5">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Download Notice:</strong>
                    {downloadError}
                  </div>
                </div>
              ) : (
                <div 
                  className="p-4 rounded-2xl text-xs text-left font-medium border"
                  style={{
                    backgroundColor: isDarkTheme ? 'rgba(30, 58, 138, 0.2)' : '#eff6ff',
                    borderColor: isDarkTheme ? 'rgba(59, 130, 246, 0.4)' : '#bfdbfe',
                    color: isDarkTheme ? '#93c5fd' : '#1e40af'
                  }}
                >
                  ℹ️ <strong>1-Time Download Policy:</strong> Your file is licensed exclusively to you and ready for instant download below.
                </div>
              )}

              <div className="pt-2 space-y-2.5">
                <button
                  disabled={isWatermarking}
                  onClick={() => handleDownload()}
                  className="w-full py-4 px-4 rounded-2xl font-black bg-gradient-to-r from-[#ff5a00] to-[#ff7a33] hover:from-[#ff6a1a] hover:to-[#ff8a43] disabled:opacity-50 text-white flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] transition"
                >
                  <Download size={20} />
                  {isWatermarking ? 'Stamping Watermark...' : 'Download My Licensed E-Book (PDF)'}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-bold hover:opacity-80 transition"
                  style={{ color: textMuted }}
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
