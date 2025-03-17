import {payment} from '../api/Payment'

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:gap-4 lg:gap-0 py-4 mb-6">
          <div className="w-full lg:w-1/3 flex flex-col gap-4 mb-6">
            <h6 className="text-lg font-semibold">Categories</h6>
            <div className="flex flex-wrap">
              <div className="w-1/2">
                <ul className="flex flex-col gap-2 text-sm text-gray-700">
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
                      <a href="#!" className="hover:text-indigo-600">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <ul className="flex flex-col gap-2 text-sm text-gray-700">
                  {[
                    "Sonic the Hedgehog",
                    "Teenage Mutant Ninja Turtles",
                    "Military",
                    "Harry Potter",
                    "Champions League",
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#!" className="hover:text-indigo-600">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap">
              {[
                {
                  title: "Get to know us",
                  links: ["Company", "About","Our Value"],
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
                  links: ["Contact", "FAQ"],
                },
              ].map((section, index) => (
                <div key={index} className="w-1/2 sm:w-1/2 md:w-1/4 flex flex-col gap-4 mb-6">
                  <h6 className="text-lg font-semibold">{section.title}</h6>
                  <ul className="flex flex-col gap-2 text-sm text-gray-700">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a href="#!" className="hover:text-indigo-600">
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

        <div className="border-t py-4 border-gray-300">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-gray-900">Payment Partners</span>
              <ul className="flex items-center gap-4">
                {payment.map((payment, index) => (
                  <li key={index}>
                    <a href="#!">
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

            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="text-gray-900">Get deliveries with FreshCart</span>
             
            </div>
          </div>
        </div>

        <div className="border-t py-4 border-gray-300 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div>
            © {new Date().getFullYear()} LegoFigures. Powered by{" "}
            <a href="https://codescandy.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600">
              Heroku
            </a>
            .
          </div>
          <div className="flex items-center gap-3">
            <span>Follow us on</span>
            <ul className="flex items-center gap-3">
              {[
                { name: "Facebook", icon: "brand-facebook" },
                { name: "X", icon: "brand-x" },
                { name: "Instagram", icon: "brand-instagram" },
              ].map((social, index) => (
                <li key={index}>
                  <a href="#!" className="p-2 border border-gray-300 rounded hover:border-green-600 hover:text-green-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <use href={`/assets/icons/tabler-icons.svg#${social.icon}`} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
