import { useState } from 'react';
import { CheckCircle2, Circle, Download, FileText } from 'lucide-react';

interface ComplianceCheckerProps {
  language: 'en' | 'hi';
}

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  itActSection?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export function ComplianceChecker({ language }: ComplianceCheckerProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const content = {
    en: {
      title: 'Security Compliance Checklist',
      subtitle: 'Comprehensive checklist for IT Act 2000 compliance and security best practices',
      filterLabel: 'Filter by Category',
      allCategories: 'All Categories',
      progress: 'Completion Progress',
      downloadReport: 'Download Compliance Report',
      categories: {
        ssl: 'SSL/TLS',
        access: 'Access Control',
        data: 'Data Protection',
        network: 'Network Security',
        incident: 'Incident Response',
        policy: 'Policies & Procedures',
        audit: 'Audit & Logging'
      },
      priorities: {
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      checklist: [
        {
          id: '1',
          category: 'ssl',
          item: 'Valid SSL/TLS certificate installed',
          description: 'Website uses HTTPS with a valid certificate from a trusted CA',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '2',
          category: 'ssl',
          item: 'TLS 1.2 or higher enabled',
          description: 'Older protocols (SSL 3.0, TLS 1.0, TLS 1.1) are disabled',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '3',
          category: 'ssl',
          item: 'Strong cipher suites configured',
          description: 'Only strong encryption algorithms are enabled',
          itActSection: 'Section 43A',
          priority: 'high' as const
        },
        {
          id: '4',
          category: 'access',
          item: 'Strong password policy enforced',
          description: 'Minimum 12 characters with complexity requirements',
          itActSection: 'Section 43',
          priority: 'critical' as const
        },
        {
          id: '5',
          category: 'access',
          item: 'Multi-factor authentication enabled',
          description: 'MFA required for administrative access',
          itActSection: 'Section 43',
          priority: 'critical' as const
        },
        {
          id: '6',
          category: 'access',
          item: 'Regular access reviews conducted',
          description: 'User permissions reviewed quarterly',
          itActSection: 'Section 43A',
          priority: 'high' as const
        },
        {
          id: '7',
          category: 'access',
          item: 'Principle of least privilege applied',
          description: 'Users have only minimum necessary permissions',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '8',
          category: 'data',
          item: 'Sensitive data encrypted at rest',
          description: 'Personal and financial data encrypted in databases',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '9',
          category: 'data',
          item: 'Data encrypted in transit',
          description: 'All data transmissions use encryption',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '10',
          category: 'data',
          item: 'Data backup procedures established',
          description: 'Regular automated backups with offsite storage',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '11',
          category: 'data',
          item: 'Data retention policy documented',
          description: 'Clear policy for data lifecycle management',
          itActSection: 'Section 43A',
          priority: 'medium' as const
        },
        {
          id: '12',
          category: 'network',
          item: 'Firewall configured and monitored',
          description: 'Network firewall with regular rule reviews',
          itActSection: 'Section 43',
          priority: 'critical' as const
        },
        {
          id: '13',
          category: 'network',
          item: 'Intrusion detection system deployed',
          description: 'IDS/IPS monitoring network traffic',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '14',
          category: 'network',
          item: 'Network segmentation implemented',
          description: 'Critical systems isolated from general network',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '15',
          category: 'network',
          item: 'VPN for remote access',
          description: 'Secure VPN required for remote connections',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '16',
          category: 'incident',
          item: 'Incident response plan documented',
          description: 'Written plan for security incident handling',
          itActSection: 'Section 70B',
          priority: 'critical' as const
        },
        {
          id: '17',
          category: 'incident',
          item: 'Incident response team assigned',
          description: 'Designated team with defined roles',
          itActSection: 'Section 70B',
          priority: 'high' as const
        },
        {
          id: '18',
          category: 'incident',
          item: 'CERT-In reporting procedures established',
          description: 'Process for reporting incidents to CERT-In',
          itActSection: 'Section 70B',
          priority: 'critical' as const
        },
        {
          id: '19',
          category: 'policy',
          item: 'Information security policy published',
          description: 'Comprehensive security policy document',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '20',
          category: 'policy',
          item: 'Privacy policy compliant with rules',
          description: 'Privacy policy meets SPDI Rules requirements',
          itActSection: 'Section 43A',
          priority: 'critical' as const
        },
        {
          id: '21',
          category: 'policy',
          item: 'Employee security training program',
          description: 'Regular security awareness training for all staff',
          itActSection: 'Section 43A',
          priority: 'high' as const
        },
        {
          id: '22',
          category: 'policy',
          item: 'Third-party vendor assessment',
          description: 'Security evaluation of vendors handling data',
          itActSection: 'Section 43A',
          priority: 'high' as const
        },
        {
          id: '23',
          category: 'audit',
          item: 'Security audit logs enabled',
          description: 'Comprehensive logging of security events',
          itActSection: 'Section 43',
          priority: 'critical' as const
        },
        {
          id: '24',
          category: 'audit',
          item: 'Log retention policy implemented',
          description: 'Logs retained for minimum 180 days',
          itActSection: 'Section 43',
          priority: 'high' as const
        },
        {
          id: '25',
          category: 'audit',
          item: 'Regular security audits conducted',
          description: 'Annual third-party security assessment',
          itActSection: 'Section 43A',
          priority: 'high' as const
        },
        {
          id: '26',
          category: 'audit',
          item: 'Vulnerability assessment performed',
          description: 'Quarterly vulnerability scans and remediation',
          itActSection: 'Section 43A',
          priority: 'medium' as const
        }
      ]
    },
    hi: {
      title: 'सुरक्षा अनुपालन चेकलिस्ट',
      subtitle: 'IT अधिनियम 2000 अनुपालन और सुरक्षा सर्वोत्तम प्रथाओं के लिए व्यापक चेकलिस्ट',
      filterLabel: 'श्रेणी के अनुसार फ़िल्टर करें',
      allCategories: 'सभी श्रेणियां',
      progress: 'पूर्णता प्रगति',
      downloadReport: 'अनुपालन रिपोर्ट डाउनलोड करें',
      categories: {
        ssl: 'SSL/TLS',
        access: 'एक्सेस नियंत्रण',
        data: 'डेटा सुरक्षा',
        network: 'नेटवर्क सुरक्षा',
        incident: 'घटना प्रतिक्रिया',
        policy: 'नीतियां और प्रक्रियाएं',
        audit: 'ऑडिट और लॉगिंग'
      },
      priorities: {
        critical: 'महत्वपूर्ण',
        high: 'उच्च',
        medium: 'मध्यम',
        low: 'निम्न'
      },
      checklist: [
        {
          id: '1',
          category: 'ssl',
          item: 'वैध SSL/TLS प्रमाणपत्र स्थापित',
          description: 'वेबसाइट विश्वसनीय CA से वैध प्रमाणपत्र के साथ HTTPS का उपयोग करती है',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '2',
          category: 'ssl',
          item: 'TLS 1.2 या उच्चतर सक्षम',
          description: 'पुराने प्रोटोकॉल (SSL 3.0, TLS 1.0, TLS 1.1) अक्षम हैं',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '3',
          category: 'ssl',
          item: 'मजबूत सिफर सूट कॉन्फ़िगर किए गए',
          description: 'केवल मजबूत एन्क्रिप्शन एल्गोरिदम सक्षम हैं',
          itActSection: 'धारा 43A',
          priority: 'high' as const
        },
        {
          id: '4',
          category: 'access',
          item: 'मजबूत पासवर्ड नीति लागू',
          description: 'जटिलता आवश्यकताओं के साथ न्यूनतम 12 वर्ण',
          itActSection: 'धारा 43',
          priority: 'critical' as const
        },
        {
          id: '5',
          category: 'access',
          item: 'बहु-कारक प्रमाणीकरण सक्षम',
          description: 'प्रशासनिक एक्सेस के लिए MFA आवश्यक',
          itActSection: 'धारा 43',
          priority: 'critical' as const
        },
        {
          id: '6',
          category: 'access',
          item: 'नियमित एक्सेस समीक्षाएं आयोजित',
          description: 'उपयोगकर्ता अनुमतियों की त्रैमासिक समीक्षा',
          itActSection: 'धारा 43A',
          priority: 'high' as const
        },
        {
          id: '7',
          category: 'access',
          item: 'न्यूनतम विशेषाधिकार का सिद्धांत लागू',
          description: 'उपयोगकर्ताओं के पास केवल न्यूनतम आवश्यक अनुमतियां हैं',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '8',
          category: 'data',
          item: 'संवेदनशील डेटा आराम पर एन्क्रिप्टेड',
          description: 'डेटाबेस में व्यक्तिगत और वित्तीय डेटा एन्क्रिप्टेड',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '9',
          category: 'data',
          item: 'ट्रांजिट में डेटा एन्क्रिप्टेड',
          description: 'सभी डेटा ट्रांसमिशन एन्क्रिप्शन का उपयोग करते हैं',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '10',
          category: 'data',
          item: 'डेटा बैकअप प्रक्रियाएं स्थापित',
          description: 'ऑफसाइट स्टोरेज के साथ नियमित स्वचालित बैकअप',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '11',
          category: 'data',
          item: 'डेटा प्रतिधारण नीति प्रलेखित',
          description: 'डेटा जीवनचक्र प्रबंधन के लिए स्पष्ट नीति',
          itActSection: 'धारा 43A',
          priority: 'medium' as const
        },
        {
          id: '12',
          category: 'network',
          item: 'फ़ायरवॉल कॉन्फ़िगर और मॉनिटर किया गया',
          description: 'नियमित नियम समीक्षाओं के साथ नेटवर्क फ़ायरवॉल',
          itActSection: 'धारा 43',
          priority: 'critical' as const
        },
        {
          id: '13',
          category: 'network',
          item: 'घुसपैठ पहचान प्रणाली तैनात',
          description: 'IDS/IPS नेटवर्क ट्रैफ़िक की निगरानी कर रहा है',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '14',
          category: 'network',
          item: 'नेटवर्क विभाजन लागू',
          description: 'सामान्य नेटवर्क से महत्वपूर्ण प्रणालियां अलग',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '15',
          category: 'network',
          item: 'दूरस्थ एक्सेस के लिए VPN',
          description: 'दूरस्थ कनेक्शन के लिए सुरक्षित VPN आवश्यक',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '16',
          category: 'incident',
          item: 'घटना प्रतिक्रिया योजना प्रलेखित',
          description: 'सुरक्षा घटना प्रबंधन के लिए लिखित योजना',
          itActSection: 'धारा 70B',
          priority: 'critical' as const
        },
        {
          id: '17',
          category: 'incident',
          item: 'घटना प्रतिक्रिया टीम नियुक्त',
          description: 'परिभाषित भूमिकाओं के साथ नामित टीम',
          itActSection: 'धारा 70B',
          priority: 'high' as const
        },
        {
          id: '18',
          category: 'incident',
          item: 'CERT-In रिपोर्टिंग प्रक्रियाएं स्थापित',
          description: 'CERT-In को घटनाओं की रिपोर्ट करने की प्रक्रिया',
          itActSection: 'धारा 70B',
          priority: 'critical' as const
        },
        {
          id: '19',
          category: 'policy',
          item: 'सूचना सुरक्षा नीति प्रकाशित',
          description: 'व्यापक सुरक्षा नीति दस्तावेज़',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '20',
          category: 'policy',
          item: 'गोपनीयता नीति नियमों के अनुरूप',
          description: 'गोपनीयता नीति SPDI नियम आवश्यकताओं को पूरा करती है',
          itActSection: 'धारा 43A',
          priority: 'critical' as const
        },
        {
          id: '21',
          category: 'policy',
          item: 'कर्मचारी सुरक्षा प्रशिक्षण कार्यक्रम',
          description: 'सभी कर्मचारियों के लिए नियमित सुरक्षा जागरूकता प्रशिक्षण',
          itActSection: 'धारा 43A',
          priority: 'high' as const
        },
        {
          id: '22',
          category: 'policy',
          item: 'तृतीय-पक्ष विक्रेता मूल्यांकन',
          description: 'डेटा संभालने वाले विक्रेताओं का सुरक्षा मूल्यांकन',
          itActSection: 'धारा 43A',
          priority: 'high' as const
        },
        {
          id: '23',
          category: 'audit',
          item: 'सुरक्षा ऑडिट लॉग सक्षम',
          description: 'सुरक्षा घटनाओं की व्यापक लॉगिंग',
          itActSection: 'धारा 43',
          priority: 'critical' as const
        },
        {
          id: '24',
          category: 'audit',
          item: 'लॉग प्रतिधारण नीति लागू',
          description: 'न्यूनतम 180 दिनों के लिए लॉग बनाए रखे गए',
          itActSection: 'धारा 43',
          priority: 'high' as const
        },
        {
          id: '25',
          category: 'audit',
          item: 'नियमित सुरक्षा ऑडिट आयोजित',
          description: 'वार्षिक तृतीय-पक्ष सुरक्षा मूल्यांकन',
          itActSection: 'धारा 43A',
          priority: 'high' as const
        },
        {
          id: '26',
          category: 'audit',
          item: 'भेद्यता मूल्यांकन किया गया',
          description: 'त्रैमासिक भेद्यता स्कैन और उपचार',
          itActSection: 'धारा 43A',
          priority: 'medium' as const
        }
      ]
    }
  };

  const t = content[language];

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const filteredItems = selectedCategory === 'all' 
    ? t.checklist 
    : t.checklist.filter(item => item.category === selectedCategory);

  const progressPercentage = Math.round((checkedItems.size / t.checklist.length) * 100);

  const priorityColors = {
    critical: 'bg-red-100 text-red-800 border-red-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const downloadReport = () => {
    const reportData = {
      date: new Date().toLocaleDateString(),
      progress: progressPercentage,
      total: t.checklist.length,
      completed: checkedItems.size,
      items: t.checklist.map(item => ({
        ...item,
        checked: checkedItems.has(item.id)
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">{t.title}</h2>
        <p className="text-slate-600 mt-2">{t.subtitle}</p>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 mb-1">{t.progress}</p>
            <p className="text-4xl">{progressPercentage}%</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 mb-1">Items Completed</p>
            <p className="text-2xl">{checkedItems.size} / {t.checklist.length}</p>
          </div>
        </div>
        <div className="w-full bg-blue-400/30 rounded-full h-3">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter and Download */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:w-auto">
            <label className="block text-sm text-slate-700 mb-2">{t.filterLabel}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">{t.allCategories}</option>
              {Object.entries(t.categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={downloadReport}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            {t.downloadReport}
          </button>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                checkedItems.has(item.id)
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {checkedItems.has(item.id) ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className={`${checkedItems.has(item.id) ? 'text-green-900' : 'text-slate-900'}`}>
                      {item.item}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs border ${priorityColors[item.priority]}`}>
                      {t.priorities[item.priority]}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 border border-slate-300">
                      {t.categories[item.category as keyof typeof t.categories]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                  {item.itActSection && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600" />
                      <p className="text-xs text-amber-800">{item.itActSection}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
