import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { 
  Download, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles,
  Twitter,
  Linkedin,
  Github,
  Globe,
  MessageCircle,
  Trophy,
  Heart,
  ExternalLink
} from "lucide-react"
import { useResume } from "../contexts/ResumeContext"
import ResumePDF from "../components/pdf/ResumePDF"

const ExportPage = () => {
  const { state } = useResume()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  const [downloadReady, setDownloadReady] = useState(false)

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    
    // Simulate PDF generation delay
    setTimeout(() => setDownloadReady(true), 1500)
  }, [])

  const socialLinks = [
    {
      name: "Twitter/X",
      icon: Twitter,
      url: "https://twitter.com/yourhandle",
      color: "hover:bg-black hover:text-white",
      bgColor: "bg-black/5"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourprofile",
      color: "hover:bg-[#0A66C2] hover:text-white",
      bgColor: "bg-[#0A66C2]/5"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/yourusername",
      color: "hover:bg-gray-800 hover:text-white",
      bgColor: "bg-gray-800/5"
    },
    {
      name: "Website",
      icon: Globe,
      url: "https://yourwebsite.com",
      color: "hover:bg-purple-600 hover:text-white",
      bgColor: "bg-purple-600/5"
    },
    {
      name: "DevPost",
      icon: Trophy,
      url: "https://devpost.com/yourprofile",
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-600/5"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/yourinvite",
      color: "hover:bg-[#5865F2] hover:text-white",
      bgColor: "bg-[#5865F2]/5"
    }
  ]

  const fileName = `${state.basics?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Sparkles 
                className="text-yellow-400" 
                size={16 + Math.random() * 16}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/builder")}
          className="mb-6 flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Editor</span>
        </button>

        {/* Success Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 Your Resume is Ready!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Congratulations! Your professional resume has been generated successfully.
            Download it now and start applying to your dream jobs!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* PDF Preview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 animate-slide-in-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Preview Your Resume
            </h2>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 h-[600px] overflow-hidden shadow-inner">
              <div className="w-full h-full bg-white rounded shadow-lg overflow-auto">
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                          .preview { text-align: center; padding: 40px; color: #666; }
                        </style>
                      </head>
                      <body>
                        <div class="preview">
                          <h2>📄 PDF Preview</h2>
                          <p>Your resume is ready for download!</p>
                          <p style="font-size: 14px; margin-top: 20px;">
                            Click the download button to get your PDF file.
                          </p>
                        </div>
                      </body>
                    </html>
                  `}
                  className="w-full h-full border-0"
                  title="Resume Preview"
                />
              </div>
            </div>
          </div>

          {/* Download & Support Section */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Download Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Download className="w-8 h-8" />
                Download Your Resume
              </h2>
              <p className="text-green-50 mb-6 text-lg">
                Your professionally crafted resume is ready. Click below to download it as a PDF file.
              </p>
              
              {downloadReady ? (
                <PDFDownloadLink
                  document={<ResumePDF data={{ state }} />}
                  fileName={fileName}
                  className="block w-full"
                >
                  {({ loading }) => (
                    <button
                      disabled={loading}
                      className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                          Preparing PDF...
                        </>
                      ) : (
                        <>
                          <Download className="w-6 h-6" />
                          Download PDF Resume
                        </>
                      )}
                    </button>
                  )}
                </PDFDownloadLink>
              ) : (
                <button
                  disabled
                  className="w-full bg-white/90 text-green-600 font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 text-lg"
                >
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  Generating PDF...
                </button>
              )}

              <p className="text-green-50 text-sm mt-4 text-center">
                File name: <span className="font-semibold">{fileName}</span>
              </p>
            </div>

            {/* Support Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Enjoyed ResumeForge?
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Support the developer by connecting on social media!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl ${social.bgColor} ${social.color} transition-all transform hover:scale-105 active:scale-95 group`}
                  >
                    <social.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">
                        {social.name}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                  <span className="font-semibold">💡 Pro Tip:</span> Follow for updates on new features and templates!
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Your Resume Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">{state.experience?.length || 0}</div>
                  <div className="text-blue-100 text-sm">Experiences</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{state.skills?.length || 0}</div>
                  <div className="text-blue-100 text-sm">Skills</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{state.education?.length || 0}</div>
                  <div className="text-blue-100 text-sm">Education</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center text-gray-600 dark:text-gray-400 animate-fade-in">
          <p className="text-lg">
            Good luck with your job applications! 🚀
          </p>
          <p className="text-sm mt-2">
            Made with ❤️ by ResumeForge
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ExportPage
