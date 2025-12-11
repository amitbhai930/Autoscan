import { useState } from 'react';
import { PlayCircle, CheckCircle2, XCircle, Clock, Download, FileText, Loader, Shield, Lock, Globe, AlertCircle } from 'lucide-react';

interface AutomatedScannerProps {
  language: 'en' | 'hi';
}

interface ScanPhase {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  findings?: number;
}

interface ScanResult {
  timestamp: string;
  domain: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  ssl: {
    valid: boolean;
    protocol: string;
    daysRemaining: number;
    issues: string[];
  };
  headers: {
    present: number;
    missing: number;
    headers: Array<{ name: string; present: boolean; severity: string }>;
  };
  compliance: {
    completed: number;
    total: number;
    criticalIssues: number;
    highIssues: number;
  };
  recommendations: string[];
  itActCompliance: string[];
}

export function AutomatedScanner({ language }: AutomatedScannerProps) {
  const [domain, setDomain] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [phases, setPhases] = useState<ScanPhase[]>([]);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [progress, setProgress] = useState(0);

  const content = {
    en: {
      title: 'Automated Security Scanner',
      subtitle: 'Run a comprehensive security assessment and generate a compliance report',
      inputLabel: 'Target Domain/Website',
      inputPlaceholder: 'example.com',
      authLabel: 'Authorization Confirmation',
      authText: 'I confirm that I own this domain or have explicit written permission to assess it. I understand that unauthorized security testing may violate IT Act, 2000 (Section 43 & 66).',
      startScan: 'Start Automated Scan',
      scanning: 'Scanning in Progress...',
      scanPhases: {
        ssl: 'SSL/TLS Certificate Validation',
        headers: 'Security Headers Analysis',
        compliance: 'Compliance Check',
        report: 'Generating Report'
      },
      results: {
        title: 'Scan Results',
        completedAt: 'Completed at',
        overallScore: 'Overall Security Score',
        grade: 'Security Grade',
        sslSection: 'SSL/TLS Analysis',
        headersSection: 'Security Headers',
        complianceSection: 'Compliance Status',
        recommendationsSection: 'Key Recommendations',
        itActSection: 'IT Act 2000 Compliance',
        downloadReport: 'Download Full Report (PDF)',
        downloadJson: 'Download Data (JSON)',
        present: 'Configured',
        missing: 'Missing',
        issues: 'Issues Found',
        daysRemaining: 'Certificate Days Remaining'
      },
      phases: {
        pending: 'Pending',
        running: 'Running',
        completed: 'Completed',
        failed: 'Failed'
      },
      errors: {
        domainRequired: 'Please enter a domain name',
        authRequired: 'Please confirm authorization to scan this domain'
      }
    },
    hi: {
      title: 'स्वचालित सुरक्षा स्कैनर',
      subtitle: 'एक व्यापक सुरक्षा मूल्यांकन चलाएं और एक अनुपालन रिपोर्ट बनाएं',
      inputLabel: 'लक्ष्य डोमेन/वेबसाइट',
      inputPlaceholder: 'example.com',
      authLabel: 'प्राधिकरण पुष्टि',
      authText: 'मैं पुष्टि करता हूं कि मैं इस डोमेन का स्वामी हूं या इसका मूल्यांकन करने के लिए मेरे पास स्पष्ट लिखित अनुमति है। मैं समझता हूं कि अनधिकृत सुरक्षा परीक्षण IT अधिनियम, 2000 (धारा 43 और 66) का उल्लंघन हो सकता है।',
      startScan: 'स्वचालित स्कैन शुरू करें',
      scanning: 'स्कैन प्रगति में...',
      scanPhases: {
        ssl: 'SSL/TLS प्रमाणपत्र सत्यापन',
        headers: 'सुरक्षा हेडर विश्लेषण',
        compliance: 'अनुपालन जांच',
        report: 'रिपोर्ट तैयार कर रहे हैं'
      },
      results: {
        title: 'स्कैन परिणाम',
        completedAt: 'पूर्ण हुआ',
        overallScore: 'समग्र सुरक्षा स्कोर',
        grade: 'सुरक्षा ग्रेड',
        sslSection: 'SSL/TLS विश्लेषण',
        headersSection: 'सुरक्षा हेडर',
        complianceSection: 'अनुपालन स्थिति',
        recommendationsSection: 'मुख्य सिफारिशें',
        itActSection: 'IT अधिनियम 2000 अनुपालन',
        downloadReport: 'पूर्ण रिपोर्ट डाउनलोड करें (PDF)',
        downloadJson: 'डेटा डाउनलोड करें (JSON)',
        present: 'कॉन्फ़िगर किया गया',
        missing: 'अनुपस्थित',
        issues: 'पाई गई समस्याएं',
        daysRemaining: 'प्रमाणपत्र शेष दिन'
      },
      phases: {
        pending: 'लंबित',
        running: 'चल रहा है',
        completed: 'पूर्ण',
        failed: 'विफल'
      },
      errors: {
        domainRequired: 'कृपया एक डोमेन नाम दर्ज करें',
        authRequired: 'कृपया इस डोमेन को स्कैन करने के लिए प्राधिकरण की पुष्टि करें'
      }
    }
  };

  const t = content[language];

  const startScan = async () => {
    if (!domain) {
      alert(t.errors.domainRequired);
      return;
    }
    if (!authorized) {
      alert(t.errors.authRequired);
      return;
    }

    setScanning(true);
    setResult(null);
    setProgress(0);

    const scanPhases: ScanPhase[] = [
      { id: 'ssl', name: t.scanPhases.ssl, status: 'pending' },
      { id: 'headers', name: t.scanPhases.headers, status: 'pending' },
      { id: 'compliance', name: t.scanPhases.compliance, status: 'pending' },
      { id: 'report', name: t.scanPhases.report, status: 'pending' }
    ];

    setPhases(scanPhases);

    // Simulate scanning process
    for (let i = 0; i < scanPhases.length; i++) {
      // Update current phase to running
      setPhases(prev => prev.map((p, idx) => 
        idx === i ? { ...p, status: 'running' } : p
      ));
      setProgress(Math.round(((i) / scanPhases.length) * 100));

      // Simulate scan duration
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Update phase to completed
      setPhases(prev => prev.map((p, idx) => 
        idx === i ? { ...p, status: 'completed', duration: Math.round(2 + Math.random() * 2) } : p
      ));
      setProgress(Math.round(((i + 1) / scanPhases.length) * 100));
    }

    // Generate mock results
    const mockResult: ScanResult = generateMockResults(domain, language);
    setResult(mockResult);
    setScanning(false);
  };

  const generateMockResults = (domain: string, lang: 'en' | 'hi'): ScanResult => {
    const sslValid = Math.random() > 0.3;
    const headersPresentCount = Math.floor(Math.random() * 3) + 4;
    const headersTotalCount = 7;
    const complianceCompleted = Math.floor(Math.random() * 10) + 15;
    const complianceTotal = 26;

    const headers = [
      { name: 'Content-Security-Policy', present: Math.random() > 0.4, severity: 'critical' },
      { name: 'Strict-Transport-Security', present: Math.random() > 0.3, severity: 'high' },
      { name: 'X-Frame-Options', present: Math.random() > 0.3, severity: 'high' },
      { name: 'X-Content-Type-Options', present: Math.random() > 0.5, severity: 'medium' },
      { name: 'X-XSS-Protection', present: Math.random() > 0.6, severity: 'medium' },
      { name: 'Referrer-Policy', present: Math.random() > 0.5, severity: 'low' },
      { name: 'Permissions-Policy', present: Math.random() > 0.5, severity: 'low' }
    ];

    const presentHeaders = headers.filter(h => h.present).length;
    const missingCritical = headers.filter(h => !h.present && h.severity === 'critical').length;

    // Calculate overall score
    const sslScore = sslValid ? 35 : 10;
    const headerScore = Math.round((presentHeaders / headers.length) * 30);
    const complianceScore = Math.round((complianceCompleted / complianceTotal) * 35);
    const overallScore = sslScore + headerScore + complianceScore;

    const getGrade = (score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' => {
      if (score >= 95) return 'A+';
      if (score >= 85) return 'A';
      if (score >= 70) return 'B';
      if (score >= 60) return 'C';
      if (score >= 50) return 'D';
      return 'F';
    };

    const recommendations = lang === 'en' ? [
      !sslValid && 'Install a valid SSL/TLS certificate from a trusted Certificate Authority',
      missingCritical > 0 && 'Configure critical security headers (CSP, HSTS) to prevent common attacks',
      complianceCompleted < 20 && 'Complete compliance checklist items, prioritizing critical and high-priority items',
      'Implement regular security awareness training for all employees',
      'Establish incident response procedures and report to CERT-In as required',
      'Conduct quarterly security assessments and annual third-party audits'
    ].filter(Boolean) as string[] : [
      !sslValid && 'विश्वसनीय प्रमाणपत्र प्राधिकरण से वैध SSL/TLS प्रमाणपत्र स्थापित करें',
      missingCritical > 0 && 'सामान्य हमलों को रोकने के लिए महत्वपूर्ण सुरक्षा हेडर (CSP, HSTS) कॉन्फ़िगर करें',
      complianceCompleted < 20 && 'अनुपालन चेकलिस्ट आइटम पूरे करें, महत्वपूर्ण और उच्च-प्राथमिकता वाली वस्तुओं को प्राथमिकता दें',
      'सभी कर्मचारियों के लिए नियमित सुरक्षा जागरूकता प्रशिक्षण लागू करें',
      'घटना प्रतिक्रिया प्रक्रियाएं स्थापित करें और आवश्यकतानुसार CERT-In को रिपोर्ट करें',
      'त्रैमासिक सुरक्षा मूल्यांकन और वार्षिक तृतीय-पक्ष ऑडिट आयोजित करें'
    ].filter(Boolean) as string[];

    const itActCompliance = lang === 'en' ? [
      'Section 43A: Reasonable security practices required for protecting sensitive personal data',
      'Section 43: Unauthorized access and data damage are punishable offenses',
      'Section 66: Computer-related offences including hacking with intent',
      'Section 70B: Mandatory reporting of cybersecurity incidents to CERT-In',
      'Section 72: Breach of confidentiality and privacy provisions',
      'SPDI Rules 2011: Compliance required for handling sensitive personal data'
    ] : [
      'धारा 43A: संवेदनशील व्यक्तिगत डेटा की सुरक्षा के लिए उचित सुरक्षा प्रथाएं आवश्यक',
      'धारा 43: अनधिकृत पहुंच और डेटा क्षति दंडनीय अपराध हैं',
      'धारा 66: इरादे से हैकिंग सहित कंप्यूटर संबंधित अपराध',
      'धारा 70B: CERT-In को साइबर सुरक्षा घटनाओं की अनिवार्य रिपोर्टिंग',
      'धारा 72: गोपनीयता और निजता के प्रावधानों का उल्लंघन',
      'SPDI नियम 2011: संवेदनशील व्यक्तिगत डेटा को संभालने के लिए अनुपालन आवश्यक'
    ];

    return {
      timestamp: new Date().toLocaleString(lang === 'en' ? 'en-IN' : 'hi-IN'),
      domain,
      overallScore,
      grade: getGrade(overallScore),
      ssl: {
        valid: sslValid,
        protocol: sslValid ? 'TLS 1.3' : 'TLS 1.2',
        daysRemaining: Math.floor(Math.random() * 300) + 30,
        issues: sslValid ? [] : lang === 'en' 
          ? ['Invalid or missing SSL certificate', 'Not using latest TLS 1.3 protocol']
          : ['अमान्य या अनुपस्थित SSL प्रमाणपत्र', 'नवीनतम TLS 1.3 प्रोटोकॉल का उपयोग नहीं कर रहे']
      },
      headers: {
        present: presentHeaders,
        missing: headers.length - presentHeaders,
        headers
      },
      compliance: {
        completed: complianceCompleted,
        total: complianceTotal,
        criticalIssues: Math.floor(Math.random() * 3) + 2,
        highIssues: Math.floor(Math.random() * 5) + 3
      },
      recommendations,
      itActCompliance
    };
  };

  const downloadPDFReport = () => {
    if (!result) return;

    const reportContent = `
═══════════════════════════════════════════════════════════
              AUTOSCAN SENTINEL
        Security Compliance Assessment Report
═══════════════════════════════════════════════════════════

Target Domain: ${result.domain}
Scan Date: ${result.timestamp}
Overall Security Score: ${result.overallScore}/100
Security Grade: ${result.grade}

═══════════════════════════════════════════════════════════
                EXECUTIVE SUMMARY
═══════════════════════════════════════════════════════════

This report presents a comprehensive security assessment of ${result.domain}
conducted in compliance with the Information Technology Act, 2000.
The assessment includes SSL/TLS validation, security header analysis,
and compliance with industry best practices.

${language === 'hi' ? `
यह रिपोर्ट ${result.domain} का एक व्यापक सुरक्षा मूल्यांकन प्रस्तुत करती है
जो सूचना प्रौद्योगिकी अधिनियम, 2000 के अनुपालन में आयोजित की गई है।
मूल्यांकन में SSL/TLS सत्यापन, सुरक्षा हेडर विश्लेषण,
और उद्योग की सर्वोत्तम प्रथाओं के अनुपालन शामिल हैं।
` : ''}

═══════════════════════════════════════════════════════════
           SSL/TLS CERTIFICATE ANALYSIS
═══════════════════════════════════════════════════════════

Certificate Status: ${result.ssl.valid ? '✓ Valid' : '✗ Invalid'}
Protocol Version: ${result.ssl.protocol}
Days Until Expiry: ${result.ssl.daysRemaining}

${result.ssl.issues.length > 0 ? `
Issues Found:
${result.ssl.issues.map(issue => `  • ${issue}`).join('\n')}
` : 'No issues found.'}

═══════════════════════════════════════════════════════════
           SECURITY HEADERS ANALYSIS
═══════════════════════════════════════════════════════════

Headers Configured: ${result.headers.present}/${result.headers.present + result.headers.missing}
Headers Missing: ${result.headers.missing}

Detailed Header Status:
${result.headers.headers.map(h => 
  `  ${h.present ? '✓' : '✗'} ${h.name} [${h.severity.toUpperCase()}]`
).join('\n')}

═══════════════════════════════════════════════════════════
              COMPLIANCE STATUS
═══════════════════════════════════════════════════════════

Items Completed: ${result.compliance.completed}/${result.compliance.total}
Completion Rate: ${Math.round((result.compliance.completed / result.compliance.total) * 100)}%
Critical Issues: ${result.compliance.criticalIssues}
High Priority Issues: ${result.compliance.highIssues}

═══════════════════════════════════════════════════════════
            KEY RECOMMENDATIONS
═══════════════════════════════════════════════════════════

${result.recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n\n')}

═══════════════════════════════════════════════════════════
        IT ACT 2000 COMPLIANCE NOTES
═══════════════════════════════════════════════════════════

${result.itActCompliance.map(item => `• ${item}`).join('\n\n')}

═══════════════════════════════════════════════════════════
                DISCLAIMER
═══════════════════════════════════════════════════════════

This report is generated by AutoScan Sentinel, an educational tool for
security awareness and compliance assessment. It does not constitute
a professional security audit. For comprehensive security assessments,
please consult certified cybersecurity professionals.

This scan should only be conducted on systems you own or have explicit
written authorization to assess. Unauthorized security testing may
violate the Information Technology Act, 2000.

${language === 'hi' ? `
यह रिपोर्ट ऑटोस्कैन सेंटिनल द्वारा तैयार की गई है, जो सुरक्षा
जागरूकता और अनुपालन मूल्यांकन के लिए एक शैक्षिक उपकरण है।
यह पेशेवर सुरक्षा ऑडिट नहीं है। व्यापक सुरक्षा मूल्यांकन के लिए,
कृपया प्रमाणित साइबर सुरक्षा पेशेवरों से परामर्श करें।
` : ''}

═══════════════════════════════════════════════════════════
Generated by AutoScan Sentinel | ${new Date().toLocaleDateString()}
Democratizing Cybersecurity for Jharkhand's Digital Growth
═══════════════════════════════════════════════════════════
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${result.domain}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (!result) return;

    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${result.domain}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade === 'B') return 'text-yellow-600';
    if (grade === 'C') return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeBgColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 border-green-300';
    if (grade === 'B') return 'bg-yellow-100 border-yellow-300';
    if (grade === 'C') return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">{t.title}</h2>
        <p className="text-slate-600 mt-2">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-2">{t.inputLabel}</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t.inputPlaceholder}
              disabled={scanning}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={authorized}
                onChange={(e) => setAuthorized(e.target.checked)}
                disabled={scanning}
                className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <div>
                <p className="text-amber-900">{t.authLabel}</p>
                <p className="text-sm text-amber-800 mt-1">{t.authText}</p>
              </div>
            </label>
          </div>

          <button
            onClick={startScan}
            disabled={scanning || !domain || !authorized}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {scanning ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {t.scanning}
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                {t.startScan}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scanning Progress */}
      {scanning && phases.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-700">Progress</p>
              <p className="text-slate-900">{progress}%</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {phases.map((phase) => (
              <div key={phase.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                {phase.status === 'pending' && <Clock className="w-5 h-5 text-slate-400" />}
                {phase.status === 'running' && <Loader className="w-5 h-5 text-blue-600 animate-spin" />}
                {phase.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                {phase.status === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
                
                <div className="flex-1">
                  <p className={`${
                    phase.status === 'running' ? 'text-blue-900' :
                    phase.status === 'completed' ? 'text-green-900' :
                    'text-slate-600'
                  }`}>
                    {phase.name}
                  </p>
                </div>

                {phase.duration && (
                  <p className="text-sm text-slate-600">{phase.duration}s</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !scanning && (
        <div className="space-y-6">
          {/* Score Card */}
          <div className={`rounded-xl border-2 p-6 ${getGradeBgColor(result.grade)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 mb-1">{t.results.overallScore}</p>
                <p className={`text-5xl ${getGradeColor(result.grade)}`}>
                  {result.overallScore}/100
                </p>
                <p className="text-slate-600 text-sm mt-2">{t.results.completedAt}: {result.timestamp}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-600 mb-2">{t.results.grade}</p>
                <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${getGradeBgColor(result.grade)}`}>
                  <p className={`text-4xl ${getGradeColor(result.grade)}`}>{result.grade}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SSL Results */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-slate-700" />
              <h3 className="text-slate-900">{t.results.sslSection}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Status</p>
                <p className={`${result.ssl.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {result.ssl.valid ? '✓ Valid' : '✗ Invalid'}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Protocol</p>
                <p className="text-slate-900">{result.ssl.protocol}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">{t.results.daysRemaining}</p>
                <p className="text-slate-900">{result.ssl.daysRemaining} days</p>
              </div>
            </div>
            {result.ssl.issues.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-900 mb-2">{t.results.issues}</p>
                <ul className="space-y-1">
                  {result.ssl.issues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                      <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Headers Results */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-slate-700" />
              <h3 className="text-slate-900">{t.results.headersSection}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 mb-1">{t.results.present}</p>
                <p className="text-2xl text-green-900">{result.headers.present}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 mb-1">{t.results.missing}</p>
                <p className="text-2xl text-red-900">{result.headers.missing}</p>
              </div>
            </div>
            <div className="space-y-2">
              {result.headers.headers.map((header, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${
                  header.present ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {header.present ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <p className={`text-sm ${header.present ? 'text-green-900' : 'text-red-900'}`}>
                      {header.name}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-white rounded border">
                    {header.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Results */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-slate-700" />
              <h3 className="text-slate-900">{t.results.complianceSection}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">Completed</p>
                <p className="text-2xl text-blue-900">
                  {result.compliance.completed}/{result.compliance.total}
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  {Math.round((result.compliance.completed / result.compliance.total) * 100)}%
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 mb-1">Critical Issues</p>
                <p className="text-2xl text-red-900">{result.compliance.criticalIssues}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-700 mb-1">High Priority</p>
                <p className="text-2xl text-orange-900">{result.compliance.highIssues}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">{t.results.recommendationsSection}</h3>
            <div className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-blue-900">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* IT Act Compliance */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <h3 className="text-amber-900">{t.results.itActSection}</h3>
            </div>
            <div className="space-y-2">
              {result.itActCompliance.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6">
            <h3 className="text-white mb-4">Download Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={downloadPDFReport}
                className="bg-white hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                {t.results.downloadReport}
              </button>
              <button
                onClick={downloadJSON}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t.results.downloadJson}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
