import Footer from "../front_page/Footer";
import Navbar from "../front_page/Navbar";
import image from "../assets/lego-man.png"; // Example image

const AboutPage = () => {
  const reviews = [
    { name: "Emma R.", feedback: "Fantastic selection and unbeatable prices! My go-to store for LEGO figures!" },
    { name: "James P.", feedback: "Fast shipping and great customer service. Highly recommended!" },
    { name: "Sophia L.", feedback: "I finally found the minifigures I was looking for. Amazing experience!" }
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* About Title */}
        <div className="text-center mb-12">
          <p className="text-base sm:text-lg font-bold text-indigo-600">About Us</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">WHO WE ARE?</h1>
        </div>

        {/* About Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
          {/* Image Section */}
         
          
          {/* Text Section */}
          <div className="lg:w-2/3 text-gray-700 text-base sm:text-lg leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Title</h2>
            <p className="mb-4">
              At Minifigure Mania, we are dedicated to bringing LEGO enthusiasts the best selection of high-quality, affordable minifigures. Our passion for LEGO fuels our commitment to offering a wide variety of figures at unbeatable prices.
            </p>
            <p className="mb-4">
              We noticed how hard it was to find rare and unique LEGO minifigures at reasonable prices. That’s why we created Minifigure Mania—to provide collectors, kids, and LEGO fans with access to the best minifigures without breaking the bank.
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Another Title</h2>
            <p className="mb-4">
              We noticed how hard it was to find rare and unique LEGO minifigures at reasonable prices. That’s why we created Minifigure Mania—to provide collectors, kids, and LEGO fans with access to the best minifigures without breaking the bank.
            </p>
          </div>

          <div className="lg:w-1/3 flex justify-center">
            <img src={image} alt="About Us" className="w-75 max-w-xs sm:max-w-sm"/>
          </div>


        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 text-center">
        <div className="text-center mb-12">
          <p className="text-base sm:text-lg font-bold text-indigo-600">Features</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">WHY SHOP WITH US?</h1>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Huge Selection", description: "We offer a massive collection of minifigures from all themes and eras!", icon: "M5 12h14M12 5l7 7-7 7" },
              { title: "Affordable Prices", description: "Competitive pricing so everyone can build their collection!", icon: "M7 8h10M7 12h10M7 16h10" },
              { title: "Fast & Secure Shipping", description: "We ensure quick, secure, and reliable delivery worldwide!", icon: "M3 10h4l3 7h4l3-7h4m-9-2V3m0 4h6" },
              { title: "Authentic & High Quality", description: "All our minifigures are 100% genuine LEGO!", icon: "M8 17h.01M12 17h.01M16 17h.01" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 text-sm sm:text-base">"{review.feedback}"</p>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mt-4">- {review.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Our Guarantee Section */}
        <div className="mt-16 text-center bg-yellow-100 py-8 sm:py-12 px-4 sm:px-6 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Our Guarantee</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            We stand behind our products 100%. If you are not completely satisfied with your purchase, we offer a hassle-free return policy and dedicated customer support to ensure your satisfaction.
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
