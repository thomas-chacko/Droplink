'use client';

import { useToastStore } from '@/store/useToastStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
            flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-in slide-in-from-right-full
            ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : ''}
            ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : ''}
            ${toast.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : ''}
          `}
                >
                    {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                    {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                    {toast.type === 'info' && <Info className="w-5 h-5" />}

                    <p className="text-sm font-medium">{toast.message}</p>

                    <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
