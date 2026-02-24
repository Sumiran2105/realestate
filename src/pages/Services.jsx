import React from 'react';
import { 
  FaShieldAlt, 
  FaSearch, 
  FaFileAlt, 
  FaCreditCard, 
  FaHome,
  FaChartLine,
  FaUserTie,
  FaBuilding,
  FaGavel,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaClock,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaFileSignature,
  FaUniversity,
  FaTools,
  FaUsers,
  FaClipboardList,
  FaRegMap,
  FaChartBar,
  FaCalculator,
  FaRegBuilding,
  FaRegCommentDots,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaCrown,
  FaGem
} from 'react-icons/fa';

const Services = () => {
  // Stats from Page 52
  const stats = [
    { id: 1, value: '50,000+', label: 'Monthly Active Users', icon: <FaUsers className="text-brand-light" /> },
    { id: 2, value: '15,000+', label: 'Properties Verified', icon: <FaCheckCircle className="text-brand-light" /> },
    { id: 3, value: '₹150Cr+', label: 'Safe Transactions', icon: <FaShieldAlt className="text-brand-light" /> },
    { id: 4, value: '99.5%', label: 'API Uptime', icon: <FaClock className="text-brand-light" /> }
  ];

  // Government Portal Integrations - FROM PAGE 7
  const governmentIntegrations = {
    telangana: [
      { name: "Dharani API", description: "Land records and pattadar information" },
      { name: "IGRS", description: "Registration and stamps department data" },
      { name: "RERA TS", description: "Project registration and compliance" },
      { name: "GHMC/HMDA", description: "Municipal approvals and building plans" },
      { name: "TSSPDCL", description: "Electricity connection verification" }
    ],
    andhraPradesh: [
      { name: "Meebhoomi API", description: "Land records and Adangal data" },
      { name: "IGRS AP", description: "Registration office records" },
      { name: "RERA AP", description: "Real estate regulatory authority" },
      { name: "CRDA/DTCP", description: "Development authority approvals" },
      { name: "APSPDCL", description: "Power distribution verification" }
    ]
  };

  // Main Services from Page 3
  const mainServices = [
    {
      id: 1,
      title: "Automated Legal Verification",
      tagline: "Direct Government API Integration",
      description: "Instant ownership verification, encumbrance checks, and document validation through government databases.",
      icon: <FaShieldAlt className="text-4xl text-brand-dark" />,
      features: [
        "Dharani/Meebhoomi ownership verification",
        "Encumbrance certificate checks",
        "Document validation against government records",
        "RERA compliance verification",
        "Municipal approval checks"
      ],
      price: "₹299 - ₹999 per report",
      badge: "Most Popular",
      color: "brand-dark",
      lightColor: "brand-soft",
      gradient: "from-brand-dark to-blue-800"
    },
    {
      id: 2,
      title: "Price Intelligence Engine",
      tagline: "ML-Powered Market Analysis",
      description: "ML algorithms analyze market data to provide accurate property valuations and price predictions.",
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      features: [
        "AI-powered fair price estimates",
        "Price per sq.ft. comparison",
        "Price trend graphs",
        "±10% price accuracy",
        "85% confidence level"
      ],
      price: "Included in reports",
      badge: "AI Powered",
      color: "blue-600",
      lightColor: "blue-50",
      gradient: "from-blue-600 to-blue-800"
    },
    {
      id: 3,
      title: "Trusted Agent Network",
      tagline: "Performance-Rated Professionals",
      description: "Verified credentials and transaction history for all agents and brokers.",
      icon: <FaUserTie className="text-4xl text-indigo-600" />,
      features: [
        "RERA license verification",
        "5-star rating system",
        "Transaction history tracking",
        "Response rate monitoring",
        "Client reviews and ratings"
      ],
      price: "₹1,499/month",
      badge: "For Agents",
      color: "indigo-600",
      lightColor: "indigo-50",
      gradient: "from-indigo-600 to-indigo-800"
    },
    {
      id: 4,
      title: "Escrow Framework",
      tagline: "Secure Payment Handling",
      description: "Token amount protection for both buyers and sellers during transactions.",
      icon: <FaCreditCard className="text-4xl text-purple-600" />,
      features: [
        "Token amount protection (₹50,000 - ₹5,00,000)",
        "2x refund if seller backs out",
        "Secure fund holding",
        "Integration with Razorpay, PayU, Cashfree",
        "2% facilitation fee"
      ],
      price: "2% of token amount",
      badge: "Secure",
      color: "purple-600",
      lightColor: "purple-50",
      gradient: "from-purple-600 to-purple-800"
    },
    {
      id: 5,
      title: "Legal Document Generation",
      tagline: "Automated Sale Agreements",
      description: "Legally compliant sale agreements customized for Telangana and Andhra Pradesh regulations.",
      icon: <FaFileAlt className="text-4xl text-amber-600" />,
      features: [
        "TS & AP compliant templates",
        "eSign integration",
        "Digital signatures",
        "Notarization services",
        "Includes two revisions"
      ],
      price: "₹999 per agreement",
      badge: "Legal",
      color: "amber-600",
      lightColor: "amber-50",
      gradient: "from-amber-600 to-amber-800"
    },
    {
      id: 6,
      title: "Post-Sale Services",
      tagline: "Complete After-Sales Support",
      description: "Mutation tracking, tax payment integration, and ongoing property management support.",
      icon: <FaTools className="text-4xl text-red-600" />,
      features: [
        "Mutation tracking (₹1,999)",
        "Property tax payment (₹50 fee)",
        "Rental agreements (₹499)",
        "Home services marketplace",
        "15-20% commission on services"
      ],
      price: "Varies by service",
      badge: "Support",
      color: "red-600",
      lightColor: "red-50",
      gradient: "from-red-600 to-red-800"
    }
  ];

  // Transaction Services from Page 4, 27, 28, 29, 30
  const transactionServices = [
    {
      id: 1,
      title: "Verification Reports",
      description: "Basic (₹299), Standard (₹599), Premium (₹999) reports with comprehensive property analysis",
      icon: <FaFileAlt className="text-3xl" />,
      price: "₹299 - ₹999",
      bgColor: "bg-brand-soft",
      textColor: "text-brand-dark",
      iconColor: "text-brand-dark"
    },
    {
      id: 2,
      title: "Home Loans",
      description: "Partnerships with SBI, HDFC, ICICI. 0.25%-0.5% commission on loan amounts",
      icon: <FaUniversity className="text-3xl" />,
      price: "0.25%-0.5% commission",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Escrow Protection",
      description: "Secure token amount handling with 2x refund guarantee",
      icon: <FaShieldAlt className="text-3xl" />,
      price: "2% fee",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Mutation Tracking",
      description: "Track name transfer in government records with automated reminders",
      icon: <FaClipboardList className="text-3xl" />,
      price: "₹1,999",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      iconColor: "text-amber-600"
    },
    {
      id: 5,
      title: "Property Tax Payment",
      description: "Integration with municipal portals for online tax payment",
      icon: <FaRupeeSign className="text-3xl" />,
      price: "₹50 convenience fee",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      iconColor: "text-indigo-600"
    },
    {
      id: 6,
      title: "Rental Agreements",
      description: "11-month rental agreements with eStamp and eSign",
      icon: <FaFileSignature className="text-3xl" />,
      price: "₹499",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      iconColor: "text-red-600"
    }
  ];

  // Free Tools from Page 31-32
  const freeTools = [
    {
      id: 1,
      title: "Price Estimator",
      description: "AI-powered fair price estimates for any property",
      icon: <FaCalculator className="text-2xl" />,
      bgColor: "bg-brand-soft",
      textColor: "text-brand-dark"
    },
    {
      id: 2,
      title: "EMI Calculator",
      description: "Calculate monthly installments and loan eligibility",
      icon: <FaChartBar className="text-2xl" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Locality Price Heatmap",
      description: "Visual representation of property prices across areas",
      icon: <FaRegMap className="text-2xl" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Price Growth Rate",
      description: "Historical price appreciation for 1, 3, and 5 years",
      icon: <FaChartLine className="text-2xl" />,
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    }
  ];

  // Testimonials from Page 52
  const testimonials = [
    {
      id: 1,
      name: "Srinivas Rao",
      location: "Hyderabad",
      rating: 5,
      text: "I was about to buy a property worth ₹80 lakhs when our platform detected a mortgage the seller didn't disclose. Saved my life savings.",
      service: "Property Verification",
      avatar: "👨",
      bgColor: "bg-brand-soft"
    },
    {
      id: 2,
      name: "Kavitha Reddy",
      location: "Warangal",
      rating: 5,
      text: "Sold my house in just 2 weeks because buyers trusted the verified badge. The AI price estimate helped me price it perfectly.",
      service: "Seller Services",
      avatar: "👩",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      location: "Vijayawada",
      rating: 5,
      text: "As an agent, the lead marketplace is a game-changer. Getting high-quality, pre-scored buyer leads.",
      service: "Agent Services",
      avatar: "👨‍💼",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-brand-dark opacity-85"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Verified Real Estate &{' '}
              <span className="text-brand-light">Intelligence Platform</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-12">
              A comprehensive blockchain-backed, AI-enhanced real estate intelligence platform 
              designed specifically for Telangana and Andhra Pradesh.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex justify-center mb-2 text-2xl">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Government Portal Integrations - FROM PAGE 7 */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Direct <span className="text-brand-dark">Government API Integration</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The cornerstone of our platform is seamless integration with government databases 
              across Telangana and Andhra Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Telangana Integrations */}
            <div className="bg-gradient-to-br from-brand-soft to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <FaRegBuilding /> Telangana Integrations
              </h3>
              <div className="space-y-4">
                {governmentIntegrations.telangana.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-brand-dark mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{item.name}:</span>
                      <span className="text-gray-600 ml-2">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Andhra Pradesh Integrations */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <FaRegMap /> Andhra Pradesh Integrations
              </h3>
              <div className="space-y-4">
                {governmentIntegrations.andhraPradesh.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{item.name}:</span>
                      <span className="text-gray-600 ml-2">{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold">Additional Third-Party Integrations:</span> Karza, Surepass for document authentication, 
              DigiLocker for Aadhaar and PAN verification, and CERSAI for SARFAESI property checks.
            </p>
          </div>
        </div>
      </div>

      {/* Main Services Grid - FROM PAGE 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-brand-dark">Comprehensive</span> Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A revolutionary platform that addresses every pain point in the real estate transaction journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {service.badge === "Most Popular" && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                  <FaCrown /> {service.badge}
                </div>
              )}
              
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-${service.lightColor}`}>
                    {service.icon}
                  </div>
                  {service.badge !== "Most Popular" && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${service.lightColor} text-${service.color}`}>
                      {service.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-sm text-brand-dark font-medium mb-3">{service.tagline}</p>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className={`text-${service.color} mt-1 flex-shrink-0 text-sm`} />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">{service.price}</span>
                  <button className={`flex items-center gap-1 text-${service.color} font-medium hover:gap-2 transition-all`}>
                    Learn More <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Services - FROM PAGE 4, 27-30 */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transaction & <span className="text-brand-dark">Support Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete financial and post-purchase support for peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactionServices.map((service) => (
              <div
                key={service.id}
                className={`${service.bgColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-dark group cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
                    <div className={service.iconColor}>
                      {service.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <span className={`inline-block text-xs font-semibold ${service.textColor} bg-white px-3 py-1 rounded-full shadow-sm`}>
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Tools - FROM PAGE 31-32 */}
      <div className="bg-brand-soft py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free <span className="text-brand-dark">Intelligence Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make data-backed decisions with our free market intelligence tools
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTools.map((tool) => (
              <div
                key={tool.id}
                className={`${tool.bgColor} rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group hover:shadow-lg`}
              >
                <div className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={tool.textColor}>
                    {tool.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <div className={`${tool.textColor} font-medium`}>
                  Try Now <FaArrowRight className="inline text-sm ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - FROM PAGE 52 */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-brand-dark">Users Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from people who found their dream homes safely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`${testimonial.bgColor} rounded-2xl p-6 shadow-lg relative hover:shadow-xl transition-shadow`}>
                <div className="absolute -top-3 left-6 text-6xl text-brand-dark opacity-20">"</div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FaMapMarkerAlt className="text-xs text-brand-dark" /> {testimonial.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 text-amber-400 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-xs" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3 italic">"{testimonial.text}"</p>
                  
                  <div className="inline-block px-2 py-1 bg-white text-brand-dark rounded-full text-xs font-semibold shadow-sm">
                    {testimonial.service}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - FROM PAGE 55 */}
      <div className="bg-brand-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-light rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Property Journey?
          </h2>
          <p className="text-xl text-brand-light mb-8 max-w-2xl mx-auto">
            Join us in building a platform that makes a lasting positive impact on how Indians buy and sell property.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-brand-dark px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg">
              <FaSearch /> Search Properties
            </button>
            <button className="bg-brand-light text-brand-dark px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transition-all flex items-center justify-center gap-2 border-2 border-white">
              <FaHome /> List Your Property
            </button>
          </div>

          <div className="mt-8 text-sm text-brand-light">
            <p>From verification through transaction to post-sale services – everything under one platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;