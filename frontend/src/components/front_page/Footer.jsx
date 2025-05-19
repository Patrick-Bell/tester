import React from 'react';
import { payment } from '../api/Payment';
import Logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="bg-gray-800 rounded-xl p-6 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">Join our newsletter</h3>
              <p className="text-gray-300 mt-1">Stay updated with new releases and exclusive offers</p>
            </div>
            <div className="w-full md:w-2/5">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-l-lg w-full focus:outline-none text-gray-800" 
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 rounded-r-lg font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:gap-4 lg:gap-0 py-4 mb-8">
          {/* Logo and company description */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0 pr-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">
                  <img className='rounded-md' src={Logo} />
                </span>
              </div>
              <span className="text-xl font-bold text-white">MinifigsMania</span>
            </div>
            <p className="text-gray-400 mb-6">Your premier destination for collectible minifigures from all your favorite franchises. Join our community now!</p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                <a 
                  key={platform} 
                  href={`https://${platform}.com`} 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <span className="text-lg">
                    {platform === 'facebook' && '𝕗'}
                    {platform === 'twitter' && '𝕏'}
                    {platform === 'instagram' && 'ⓘ'}
                    {platform === 'youtube' && '▶'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <h6 className="text-lg font-semibold text-white mb-4">Categories</h6>
            <div className="flex flex-wrap">
              <div className="w-1/2">
                <ul className="flex flex-col gap-2 text-sm text-gray-400">
                  {[
                    "Football",
                    "NBA",
                    "Squid Game",
                    "Marvel",
                    "Disney",
                    "The Simpsons",
                    "Stranger Things",
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#!" className="hover:text-indigo-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <ul className="flex flex-col gap-2 text-sm text-gray-400">
                  {[
                    "Sonic the Hedgehog",
                    "Teenage Mutant Ninja Turtles",
                    "Military",
                    "Harry Potter",
                    "Champions League",
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#!" className="hover:text-indigo-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="w-full lg:w-2/4">
            <div className="flex flex-wrap">
              {[
                {
                  title: "Get to know us",
                  links: ["Company", "About", "Our Values", "Careers", "Blog"],
                },
                {
                  title: "For Consumers",
                  links: ["Payments", "Shipping", "Product Returns", "FAQ", "Shop Checkout"],
                },
                {
                  title: "Become a Shopper",
                  links: [
                    "Shopper Opportunities",
                    "Become a Shopper",
                    "Earnings",
                    "Ideas & Guides",
                    "New Retailers",
                  ],
                },
                {
                  title: "Contact Us",
                  links: ["Help Center", "Contact Form", "Live Chat", "+1 (800) 123-4567", "support@figurecraft.com"],
                },
              ].map((section, index) => (
                <div key={index} className="w-1/2 sm:w-1/2 md:w-1/4 flex flex-col gap-4 mb-6">
                  <h6 className="text-white text-lg font-semibold">{section.title}</h6>
                  <ul className="flex flex-col gap-2 text-sm text-gray-400">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a href="#!" className="hover:text-indigo-400 transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-gray-300 font-medium">Payment Methods</span>
              <ul className="flex items-center gap-4 flex-wrap">
                {payment.map((payment, index) => (
                  <li key={index}>
                    <a href="#!" className="bg-white p-1 rounded flex items-center justify-center">
                      <img
                        src={payment.icon}
                        alt={payment}
                        className="h-8"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-300">Get our app:</span>
              <a href="#!" className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2 transition-colors">
                <span>📱</span>
                <span>App Store</span>
              </a>
              <a href="#!" className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2 transition-colors">
                <span>🤖</span>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 mt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#!" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#!" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#!" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#!" className="hover:text-white transition-colors">Accessibility</a>
          </div>
          <div>
            <p>© {currentYear} MinifigsMania. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;