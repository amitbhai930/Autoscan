import { useState } from 'react';
import { Shield, FileText, CheckCircle2, AlertCircle, Globe, Lock, FileCheck, BookOpen, PlayCircle } from 'lucide-react';
import { SSLChecker } from './components/SSLChecker';
import { HeaderAnalyzer } from './components/HeaderAnalyzer';
import { ComplianceChecker } from './components/ComplianceChecker';
import { PolicyTemplates } from './components/PolicyTemplates';
import { Dashboard } from './components/Dashboard';
import { AutomatedScanner } from './components/AutomatedScanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scanner' | 'ssl' | 'headers' | 'compliance' | 'templates'>('dashboard');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const content = {
    en: {
      title: 'AutoScan Sentinel',
      subtitle: 'Security Compliance & Best Practices for Indian Businesses',
      tagline: 'Democratizing Cybersecurity for Jharkhand\'s Digital Growth',
      tabs: {
        dashboard: 'Dashboard',
        scanner: 'Automated Scanner',
        ssl: 'SSL/TLS Check',
        headers: 'Security Headers',
        compliance: 'Compliance Checklist',
        templates: 'Policy Templates'
      }
    },
    hi: {
      title: 'ऑटोस्कैन सेंटिनल',
      subtitle: 'भारतीय व्यवसायों के लिए सुरक्षा अनुपालन और सर्वोत्तम प्रथाएं',
      tagline: 'झारखंड के डिजिटल विकास के लिए साइबर सुरक्षा का लोकतंत्रीकरण',
      tabs: {
        dashboard: 'डैशबोर्ड',
        scanner: 'स्वचालित स्कैनर',
        ssl: 'SSL/TLS जांच',
        headers: 'सुरक्षा हेडर',
        compliance: 'अनुपालन चेकलिस्ट',
        templates: 'नीति टेम्पलेट'
      }
    }
  };

  const t = content[language];

  const tabs = [
    { id: 'dashboard' as const, icon: Shield, label: t.tabs.dashboard },
    { id: 'scanner' as const, icon: PlayCircle, label: t.tabs.scanner },
    { id: 'ssl' as const, icon: Lock, label: t.tabs.ssl },
    { id: 'headers' as const, icon: Globe, label: t.tabs.headers },
    { id: 'compliance' as const, icon: CheckCircle2, label: t.tabs.compliance },
    { id: 'templates' as const, icon: FileText, label: t.tabs.templates }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">{t.title}</h1>
                <p className="text-slate-600 text-sm">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                {language === 'en' ? 'हिन्दी' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              {language === 'en' ? (
                <p>
                  <strong>Authorized Use Only:</strong> Only test websites and systems you own or have explicit written permission to assess. 
                  Unauthorized security testing may violate the Information Technology Act, 2000, Section 43 & 66.
                </p>
              ) : (
                <p>
                  <strong>केवल अधिकृत उपयोग:</strong> केवल उन वेबसाइटों और सिस्टमों का परीक्षण करें जो आपके हैं या जिनके परीक्षण के लिए आपके पास स्पष्ट लिखित अनुमति है। 
                  अनधिकृत सुरक्षा परीक्षण सूचना प्रौद्योगिकी अधिनियम, 2000, धारा 43 और 66 का उल्लंघन हो सकता है।
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard language={language} />}
        {activeTab === 'scanner' && <AutomatedScanner language={language} />}
        {activeTab === 'ssl' && <SSLChecker language={language} />}
        {activeTab === 'headers' && <HeaderAnalyzer language={language} />}
        {activeTab === 'compliance' && <ComplianceChecker language={language} />}
        {activeTab === 'templates' && <PolicyTemplates language={language} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-600">
            {language === 'en' ? (
              <p>
                AutoScan Sentinel is an educational tool for security awareness and compliance. 
                It does not perform active penetration testing. For professional security audits, consult certified experts.
              </p>
            ) : (
              <p>
                ऑटोस्कैन सेंटिनल सुरक्षा जागरूकता और अनुपालन के लिए एक शैक्षिक उपकरण है। 
                यह सक्रिय पेनिट्रेशन परीक्षण नहीं करता है। पेशेवर सुरक्षा ऑडिट के लिए, प्रमाणित विशेषज्ञों से परामर्श करें।
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}