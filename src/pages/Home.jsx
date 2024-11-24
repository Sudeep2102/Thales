import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-white">
      <header className="bg-blue-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-white font-bold text-xl">EcoTrack</div>
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">Login</Link>
              <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md">Register</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Transform Your</span>
                    <span className="block text-blue-600">Supply Chain Sustainability</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join industry leaders in revolutionizing supply chain sustainability. Our AI-powered platform helps you track, optimize, and improve your environmental impact while ensuring compliance and reducing costs.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Get started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive Supply Chain Solutions
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform offers end-to-end visibility and control over your supply chain sustainability metrics.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'AI-Powered Analytics',
                    description: 'Advanced machine learning algorithms analyze your supply chain data to identify optimization opportunities and predict potential risks.',
                    icon: '📊'
                  },
                  {
                    title: 'Real-time Monitoring',
                    description: 'Track environmental metrics, carbon emissions, and sustainability KPIs in real-time across your entire supply chain network.',
                    icon: '🔍'
                  },
                  {
                    title: 'Route Optimization',
                    description: 'Optimize shipping routes for reduced environmental impact while maintaining efficiency and cost-effectiveness.',
                    icon: '🚢'
                  },
                  {
                    title: 'Compliance Management',
                    description: 'Stay compliant with environmental regulations and standards across different regions and jurisdictions.',
                    icon: '✓'
                  },
                  {
                    title: 'Sustainability Reporting',
                    description: 'Generate comprehensive sustainability reports and analytics for stakeholders and regulatory requirements.',
                    icon: '📈'
                  },
                  {
                    title: 'Risk Assessment',
                    description: 'Identify and mitigate environmental risks in your supply chain with predictive analytics and early warning systems.',
                    icon: '⚠️'
                  }
                ].map((feature) => (
                  <div key={feature.title} className="relative">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-3xl mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Why Companies Choose EcoTrack
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Industry Leadership",
                  description: "Trusted by Fortune 500 companies for supply chain sustainability management."
                },
                {
                  title: "Proven Results",
                  description: "Average 30% reduction in carbon emissions and 25% cost savings for our clients."
                },
                {
                  title: "Easy Integration",
                  description: "Seamlessly integrates with existing ERP and supply chain management systems."
                },
                {
                  title: "Expert Support",
                  description: "24/7 dedicated support team and sustainability consultants at your service."
                },
                {
                  title: "Data Security",
                  description: "Enterprise-grade security with encryption and compliance with global standards."
                },
                {
                  title: "Continuous Innovation",
                  description: "Regular updates with the latest sustainability technologies and features."
                }
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">About EcoTrack</h3>
              <p className="text-gray-300">
                Leading the way in supply chain sustainability solutions. Our platform helps businesses reduce their environmental impact while improving operational efficiency.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white">Register</Link></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-2">
                <a href="mailto:contact@ecotrack.com" className="text-gray-300 hover:text-white block">
                  contact@ecotrack.com
                </a>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 mb-4 md:mb-0">
                <p>© 2024 EcoTrack. All rights reserved.</p>
                <p className="mt-2">Developed by:</p>
                <div className="flex space-x-4 mt-2">
                  <a href="https://www.linkedin.com/in/ishita-jindal1/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Ishita Jindal
                  </a>
                  <span className="text-gray-500">|</span>
                  <a href="https://www.linkedin.com/in/sudeepssahu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Sudeep Sahu
                  </a>
                </div>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;