import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="monday-container py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">ViralReach</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="/contact" className="text-blue-600 font-medium">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="monday-container py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-blue-600">ViralReach</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your influencer marketing? We're here to help you connect with the right creators and scale your brand.
          </p>
        </div>

        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 monday-gradient-purple rounded-lg mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div>
                <div className="text-xl font-semibold">ViralReach</div>
              </div>
              <p className="text-gray-400 mb-4">
                Authentic influencer marketing made simple.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ViralReach. Empowering authentic influence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 