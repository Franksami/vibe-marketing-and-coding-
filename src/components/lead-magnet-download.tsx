'use client'

import { useState } from 'react';
import { Download, CheckCircle, Loader2 } from 'lucide-react';

interface LeadMagnetDownloadProps {
  fileName: string;
  fileUrl: string;
  title: string;
  description: string;
}

export function LeadMagnetDownload({
  fileName,
  fileUrl,
  title,
  description
}: LeadMagnetDownloadProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      // Track download event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'download', {
          event_category: 'lead_magnet',
          event_label: fileName
        });
      }

      // Create download link
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloaded(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setDownloaded(false);
      }, 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 rounded-lg border border-purple-500/20">
      <h3 className="text-2xl font-bold mb-4">🎆 {title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {downloading ? (
          <>
            <Loader2 className="animate-spin" size={24} />
            Preparing Download...
          </>
        ) : downloaded ? (
          <>
            <CheckCircle size={24} />
            Downloaded!
          </>
        ) : (
          <>
            <Download size={24} />
            Download Now (Free)
          </>
        )}
      </button>
      
      <p className="text-sm text-gray-400 mt-4">
        {fileName} • Instant download • No email required
      </p>
    </div>
  );
}
