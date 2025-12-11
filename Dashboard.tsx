import { Shield, Lock, Globe, FileCheck, AlertTriangle, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  language: 'en' | 'hi';
}

export function Dashboard({ language }: DashboardProps) {
  const content = {
    en: {
      title: 'Security Overview Dashboard',
      subtitle: 'Quick insights into common security best practices',
      stats: {
        title: 'Indian Cybersecurity Landscape',
        items: [
          { label: 'Data Breaches (2024)', value: '1,200+', trend: 'up' },
          { label: 'CERT-In Advisories', value: '350+', trend: 'up' },
          { label: 'Ransomware Attacks', value: '45%', trend: 'up' },
          { label: 'SSL Adoption Rate', value: '72%', trend: 'up' }
        ]
      },
      quickChecks: {
        title: 'Quick Security Checks',
        description: 'Use the tools above to perform these essential security checks:',
        items: [
          { icon: Lock, title: 'SSL/TLS Certificate', desc: 'Verify your website uses HTTPS and has a valid certificate' },
          { icon: Globe, title: 'Security Headers', desc: 'Check if proper security headers are configured' },
          { icon: FileCheck, title: 'Compliance Status', desc: 'Review your compliance with IT Act, 2000 requirements' },
          { icon: Shield, title: 'Security Policies', desc: 'Download and customize security policy templates' }
        ]
      },
      itAct: {
        title: 'Relevant IT Act, 2000 Sections',
        items: [
          { section: 'Section 43', title: 'Penalty for damage to computer systems', desc: 'Unauthorized access, downloading, extraction or damage to data' },
          { section: 'Section 66', title: 'Computer related offences', desc: 'Hacking with intent to cause wrongful loss or damage' },
          { section: 'Section 72', title: 'Breach of confidentiality and privacy', desc: 'Disclosure of information in breach of lawful contract' },
          { section: 'Section 43A', title: 'Compensation for failure to protect data', desc: 'Body corporate liable for failure to protect sensitive personal data' }
        ]
      },
      bestPractices: {
        title: 'Essential Security Best Practices',
        items: [
          { status: 'critical', text: 'Use HTTPS (SSL/TLS) for all web communications' },
          { status: 'critical', text: 'Implement strong password policies (min 12 characters, complexity)' },
          { status: 'high', text: 'Enable security headers (CSP, X-Frame-Options, HSTS)' },
          { status: 'high', text: 'Regular software updates and patch management' },
          { status: 'medium', text: 'Implement Web Application Firewall (WAF)' },
          { status: 'medium', text: 'Regular security awareness training for staff' },
          { status: 'low', text: 'Maintain security incident response plan' },
          { status: 'low', text: 'Regular backup and disaster recovery testing' }
        ]
      }
    },
    hi: {
      title: 'सुरक्षा अवलोकन डैशबोर्ड',
      subtitle: 'सामान्य सुरक्षा सर्वोत्तम प्रथाओं में त्वरित अंतर्दृष्टि',
      stats: {
        title: 'भारतीय साइबर सुरक्षा परिदृश्य',
        items: [
          { label: 'डेटा उल्लंघन (2024)', value: '1,200+', trend: 'up' },
          { label: 'CERT-In सलाह', value: '350+', trend: 'up' },
          { label: 'रैनसमवेयर हमले', value: '45%', trend: 'up' },
          { label: 'SSL अपनाने की दर', value: '72%', trend: 'up' }
        ]
      },
      quickChecks: {
        title: 'त्वरित सुरक्षा जांच',
        description: 'इन आवश्यक सुरक्षा जांचों को करने के लिए ऊपर दिए गए उपकरणों का उपयोग करें:',
        items: [
          { icon: Lock, title: 'SSL/TLS प्रमाणपत्र', desc: 'सत्यापित करें कि आपकी वेबसाइट HTTPS का उपयोग करती है और एक वैध प्रमाणपत्र है' },
          { icon: Globe, title: 'सुरक्षा हेडर', desc: 'जांचें कि उचित सुरक्षा हेडर कॉन्फ़िगर किए गए हैं या नहीं' },
          { icon: FileCheck, title: 'अनुपालन स्थिति', desc: 'IT अधिनियम, 2000 आवश्यकताओं के साथ अपने अनुपालन की समीक्षा करें' },
          { icon: Shield, title: 'सुरक्षा नीतियां', desc: 'सुरक्षा नीति टेम्पलेट डाउनलोड और अनुकूलित करें' }
        ]
      },
      itAct: {
        title: 'प्रासंगिक IT अधिनियम, 2000 की धाराएं',
        items: [
          { section: 'धारा 43', title: 'कंप्यूटर सिस्टम को नुकसान के लिए दंड', desc: 'अनधिकृत पहुंच, डाउनलोडिंग, निष्कर्षण या डेटा को नुकसान' },
          { section: 'धारा 66', title: 'कंप्यूटर संबंधित अपराध', desc: 'गलत नुकसान या क्षति पहुंचाने के इरादे से हैकिंग' },
          { section: 'धारा 72', title: 'गोपनीयता और निजता का उल्लंघन', desc: 'वैध अनुबंध के उल्लंघन में जानकारी का खुलासा' },
          { section: 'धारा 43A', title: 'डेटा की रक्षा करने में विफलता के लिए मुआवजा', desc: 'संवेदनशील व्यक्तिगत डेटा की सुरक्षा करने में विफलता के लिए निगमित निकाय उत्तरदायी' }
        ]
      },
      bestPractices: {
        title: 'आवश्यक सुरक्षा सर्वोत्तम प्रथाएं',
        items: [
          { status: 'critical', text: 'सभी वेब संचार के लिए HTTPS (SSL/TLS) का उपयोग करें' },
          { status: 'critical', text: 'मजबूत पासवर्ड नीतियां लागू करें (न्यूनतम 12 वर्ण, जटिलता)' },
          { status: 'high', text: 'सुरक्षा हेडर सक्षम करें (CSP, X-Frame-Options, HSTS)' },
          { status: 'high', text: 'नियमित सॉफ्टवेयर अपडेट और पैच प्रबंधन' },
          { status: 'medium', text: 'वेब एप्लिकेशन फ़ायरवॉल (WAF) लागू करें' },
          { status: 'medium', text: 'कर्मचारियों के लिए नियमित सुरक्षा जागरूकता प्रशिक्षण' },
          { status: 'low', text: 'सुरक्षा घटना प्रतिक्रिया योजना बनाए रखें' },
          { status: 'low', text: 'नियमित बैकअप और आपदा पुनर्प्राप्ति परीक्षण' }
        ]
      }
    }
  };

  const t = content[language];

  const statusColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">{t.title}</h2>
        <p className="text-slate-600 mt-2">{t.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">{t.stats.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {t.stats.items.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl text-slate-900 mt-1">{stat.value}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Checks */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-2">{t.quickChecks.title}</h3>
        <p className="text-slate-600 text-sm mb-6">{t.quickChecks.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.quickChecks.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IT Act Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">{t.itAct.title}</h3>
        <div className="space-y-3">
          {t.itAct.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-20 h-8 bg-amber-200 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-amber-900">{item.section}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">{t.bestPractices.title}</h3>
        <div className="space-y-2">
          {t.bestPractices.items.map((item, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${statusColors[item.status as keyof typeof statusColors]}`}>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
