import { useState } from 'react';
import { Globe, CheckCircle2, XCircle, AlertTriangle, Shield } from 'lucide-react';

interface HeaderAnalyzerProps {
  language: 'en' | 'hi';
}

interface SecurityHeader {
  name: string;
  present: boolean;
  value?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

export function HeaderAnalyzer({ language }: HeaderAnalyzerProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState<SecurityHeader[] | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const content = {
    en: {
      title: 'Security Headers Analyzer',
      subtitle: 'Check your website\'s HTTP security headers configuration',
      inputLabel: 'Website URL',
      inputPlaceholder: 'https://example.com',
      analyzeButton: 'Analyze Headers',
      analyzing: 'Analyzing security headers...',
      aboutTitle: 'About Security Headers',
      aboutText: 'HTTP security headers are directives sent by your web server that instruct browsers how to behave when handling your site\'s content. Proper configuration prevents common attacks like XSS, clickjacking, and MIME-sniffing.',
      results: {
        score: 'Security Score',
        outOf: 'out of 100',
        headerStatus: 'Header Status',
        present: 'Configured',
        missing: 'Missing',
        headerName: 'Header',
        status: 'Status',
        description: 'Description',
        recommendation: 'Recommendation',
        itActCompliance: 'IT Act, 2000 Compliance'
      },
      complianceNote: 'Implementing security headers is part of reasonable security practices required under Section 43A for protecting sensitive personal data.',
      gradeLabels: {
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor'
      }
    },
    hi: {
      title: 'सुरक्षा हेडर विश्लेषक',
      subtitle: 'अपनी वेबसाइट के HTTP सुरक्षा हेडर कॉन्फ़िगरेशन की जांच करें',
      inputLabel: 'वेबसाइट URL',
      inputPlaceholder: 'https://example.com',
      analyzeButton: 'हेडर विश्लेषण करें',
      analyzing: 'सुरक्षा हेडर का विश्लेषण कर रहे हैं...',
      aboutTitle: 'सुरक्षा हेडर के बारे में',
      aboutText: 'HTTP सुरक्षा हेडर आपके वेब सर्वर द्वारा भेजे गए निर्देश हैं जो ब्राउज़रों को यह बताते हैं कि आपकी साइट की सामग्री को कैसे संभालना है। उचित कॉन्फ़िगरेशन XSS, क्लिकजैकिंग और MIME-स्निफिंग जैसे सामान्य हमलों को रोकता है।',
      results: {
        score: 'सुरक्षा स्कोर',
        outOf: '100 में से',
        headerStatus: 'हेडर स्थिति',
        present: 'कॉन्फ़िगर किया गया',
        missing: 'अनुपस्थित',
        headerName: 'हेडर',
        status: 'स्थिति',
        description: 'विवरण',
        recommendation: 'सिफारिश',
        itActCompliance: 'IT अधिनियम, 2000 अनुपालन'
      },
      complianceNote: 'सुरक्षा हेडर लागू करना संवेदनशील व्यक्तिगत डेटा की सुरक्षा के लिए धारा 43A के तहत आवश्यक उचित सुरक्षा प्रथाओं का हिस्सा है।',
      gradeLabels: {
        excellent: 'उत्कृष्ट',
        good: 'अच्छा',
        fair: 'ठीक',
        poor: 'खराब'
      }
    }
  };

  const t = content[language];

  const analyzeHeaders = () => {
    if (!url) return;

    setLoading(true);
    setHeaders(null);
    setScore(null);

    // Simulate header analysis with mock data
    setTimeout(() => {
      const mockHeaders: SecurityHeader[] = [
        {
          name: 'Content-Security-Policy',
          present: Math.random() > 0.5,
          value: 'default-src \'self\'; script-src \'self\' \'unsafe-inline\'',
          severity: 'critical',
          description: language === 'en' 
            ? 'Prevents XSS attacks by controlling which resources can be loaded'
            : 'लोड किए जा सकने वाले संसाधनों को नियंत्रित करके XSS हमलों को रोकता है',
          recommendation: language === 'en'
            ? 'Implement a strict CSP policy to prevent cross-site scripting attacks'
            : 'क्रॉस-साइट स्क्रिप्टिंग हमलों को रोकने के लिए एक सख्त CSP नीति लागू करें'
        },
        {
          name: 'Strict-Transport-Security',
          present: Math.random() > 0.4,
          value: 'max-age=31536000; includeSubDomains',
          severity: 'high',
          description: language === 'en'
            ? 'Forces browsers to use HTTPS connections only'
            : 'ब्राउज़रों को केवल HTTPS कनेक्शन का उपयोग करने के लिए मजबूर करता है',
          recommendation: language === 'en'
            ? 'Enable HSTS with at least 1 year max-age and include subdomains'
            : 'कम से कम 1 वर्ष की अधिकतम आयु के साथ HSTS सक्षम करें और सबडोमेन शामिल करें'
        },
        {
          name: 'X-Frame-Options',
          present: Math.random() > 0.3,
          value: 'SAMEORIGIN',
          severity: 'high',
          description: language === 'en'
            ? 'Prevents clickjacking attacks by controlling iframe embedding'
            : 'iframe एम्बेडिंग को नियंत्रित करके क्लिकजैकिंग हमलों को रोकता है',
          recommendation: language === 'en'
            ? 'Set to DENY or SAMEORIGIN to prevent clickjacking'
            : 'क्लिकजैकिंग को रोकने के लिए DENY या SAMEORIGIN पर सेट करें'
        },
        {
          name: 'X-Content-Type-Options',
          present: Math.random() > 0.5,
          value: 'nosniff',
          severity: 'medium',
          description: language === 'en'
            ? 'Prevents MIME-sniffing attacks'
            : 'MIME-स्निफिंग हमलों को रोकता है',
          recommendation: language === 'en'
            ? 'Set to "nosniff" to prevent browsers from MIME-sniffing'
            : 'ब्राउज़रों को MIME-स्निफिंग से रोकने के लिए "nosniff" पर सेट करें'
        },
        {
          name: 'X-XSS-Protection',
          present: Math.random() > 0.6,
          value: '1; mode=block',
          severity: 'medium',
          description: language === 'en'
            ? 'Enables browser XSS filtering (legacy header)'
            : 'ब्राउज़र XSS फ़िल्टरिंग सक्षम करता है (पुराना हेडर)',
          recommendation: language === 'en'
            ? 'Set to "1; mode=block" for legacy browser support'
            : 'पुराने ब्राउज़र समर्थन के लिए "1; mode=block" पर सेट करें'
        },
        {
          name: 'Referrer-Policy',
          present: Math.random() > 0.4,
          value: 'strict-origin-when-cross-origin',
          severity: 'low',
          description: language === 'en'
            ? 'Controls how much referrer information is shared'
            : 'नियंत्रित करता है कि कितनी रेफ़रर जानकारी साझा की जाती है',
          recommendation: language === 'en'
            ? 'Use "strict-origin-when-cross-origin" or "no-referrer" for privacy'
            : 'गोपनीयता के लिए "strict-origin-when-cross-origin" या "no-referrer" का उपयोग करें'
        },
        {
          name: 'Permissions-Policy',
          present: Math.random() > 0.5,
          value: 'geolocation=(), microphone=(), camera=()',
          severity: 'low',
          description: language === 'en'
            ? 'Controls which browser features can be used'
            : 'नियंत्रित करता है कि कौन से ब्राउज़र फ़ीचर उपयोग किए जा सकते हैं',
          recommendation: language === 'en'
            ? 'Disable unnecessary browser features to reduce attack surface'
            : 'हमले की सतह को कम करने के लिए अनावश्यक ब्राउज़र फ़ीचर अक्षम करें'
        }
      ];

      setHeaders(mockHeaders);

      // Calculate score
      const presentCount = mockHeaders.filter(h => h.present).length;
      const totalScore = Math.round((presentCount / mockHeaders.length) * 100);
      setScore(totalScore);

      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 80) return t.gradeLabels.excellent;
    if (score >= 60) return t.gradeLabels.good;
    if (score >= 40) return t.gradeLabels.fair;
    return t.gradeLabels.poor;
  };

  const severityColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">{t.title}</h2>
        <p className="text-slate-600 mt-2">{t.subtitle}</p>
      </div>

      {/* About */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-blue-900">{t.aboutTitle}</h3>
            <p className="text-blue-800 text-sm mt-2">{t.aboutText}</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">{t.inputLabel}</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              onKeyPress={(e) => e.key === 'Enter' && analyzeHeaders()}
            />
          </div>
          <button
            onClick={analyzeHeaders}
            disabled={!url || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Globe className="w-5 h-5" />
            {loading ? t.analyzing : t.analyzeButton}
          </button>
        </div>
      </div>

      {/* Results */}
      {headers && score !== null && (
        <div className="space-y-6">
          {/* Score */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="text-center">
              <p className="text-slate-600 mb-2">{t.results.score}</p>
              <div className={`text-6xl mb-2 ${getScoreColor(score)}`}>
                {score}
              </div>
              <p className="text-slate-600">{t.results.outOf}</p>
              <p className="text-slate-900 mt-2">{getScoreGrade(score)}</p>
            </div>
          </div>

          {/* Headers List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">{t.results.headerStatus}</h3>
            <div className="space-y-3">
              {headers.map((header, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  {/* Header Name and Status */}
                  <div className={`p-4 ${header.present ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {header.present ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <p className={`${header.present ? 'text-green-900' : 'text-red-900'}`}>
                            {header.name}
                          </p>
                          {header.present && header.value && (
                            <p className="text-xs text-slate-600 mt-1 font-mono">{header.value}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs border ${severityColors[header.severity]}`}>
                          {header.severity.toUpperCase()}
                        </span>
                        <span className={`text-sm ${header.present ? 'text-green-600' : 'text-red-600'}`}>
                          {header.present ? t.results.present : t.results.missing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description and Recommendation */}
                  <div className="p-4 bg-white border-t border-slate-200">
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>{t.results.description}:</strong> {header.description}
                    </p>
                    {!header.present && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-900">
                          <strong>{t.results.recommendation}:</strong> {header.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IT Act Compliance */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <h3 className="text-amber-900 mb-2">{t.results.itActCompliance}</h3>
            <p className="text-sm text-amber-800">{t.complianceNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}
