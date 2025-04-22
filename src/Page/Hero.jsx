import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import team1 from "../assets/testimonials-5.jpg";
import team2 from "../assets/testimonials-5.jpg";
import team3 from "../assets/testimonials-5.jpg";
import team4 from "../assets/testimonials-5.jpg";
import team5 from "../assets/testimonials-5.jpg";
import Footer from "../components/Footer";
const teamMembers = [
  { img: team1, name: "John Doe", role: "AI Engineer" },
  { img: team2, name: "Jane Smith", role: "Frontend Developer" },
  { img: team3, name: "Alice Johnson", role: "UX Designer" },
  { img: team4, name: "Mike Brown", role: "Backend Developer" },
  { img: team5, name: "Sarah Wilson", role: "Data Scientist" },
  { img: team5, name: "Sarah Wilson", role: "Data Scientist" },
  { img: team5, name: "Sarah Wilson", role: "Data Scientist" },
];

const Hero = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3; // Number of cards to display at a time

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev === 0 ? teamMembers.length - visibleCards : prev - 1
    );
  };

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + visibleCards >= teamMembers.length ? 0 : prev + 1
    );
  };

  return (
    <>
      <main className="relative h-[100vh] bg-[#a36144] flex items-center justify-center text-center p-6 font-[Amiri]">
        <div className="w-[50%] max-sm:w-[90%] max-md:w-[80%] max-lg:w-[70%] text-[#f5f5f5]">
          <h1 className="text-4xl font-bold mb-4 tracking-widest text-[#fff]">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
          </h1>
          <p className="text-[#c9c0bb] mb-6 text-lg leading-relaxed">
            مرحبًا بك في منصّتنا، حيث يلتقي التراث العريق بأحدث تقنيات الذكاء
            الاصطناعي.
          </p>
          <div className="bg-[#6a5c51] p-6 rounded-lg shadow-md border border-[#3a2e28]">
            <h2 className="text-2xl text-white font-semibold mb-3">
              روبوتات المعرفة
            </h2>
            <p className="text-[#f5f5f5] text-base">
              استكشف روبوتاتنا الذكية المتخصصة في الشعر، الطب، والمساعدة
              اليومية.
            </p>
          </div>
        </div>
      </main>

      <section id="about-us" className="padding h-[100vh] relative z-10 mb-20">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700 mb-4">
            We are a team of passionate developers and designers dedicated to
            creating innovative solutions that make life easier. Our mission is
            to provide cutting-edge chatbot technology to help businesses and
            individuals achieve their goals.
          </p>
          <div className="bg-indigo-100 mx-auto lg:w-[70%] p-4 rounded-lg mt-16">
            <h2 className="text-xl text-center font-semibold mb-2">Our Team</h2>
            <p className="text-gray-700 text-center">
              Meet the talented individuals behind our success. We are a diverse
              group of experts in AI, software development, and user experience
              design.
            </p>
          </div>

          {/* Carousel Section */}
          <div className="relative w-full max-w-4xl mx-auto mt-9 mb-12 overflow-hidden">
            {/* Team Cards Container */}
            <div
              className="flex gap-4 sm:gap-6 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / visibleCards)}%)`,
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-indigo-100 rounded-lg shadow-lg p-4 sm:p-6 border text-center flex-shrink-0 
                             w-full sm:w-1/2 lg:w-1/3"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    draggable="false"
                    className="w-full h-32 sm:h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-base sm:text-lg font-semibold mt-2">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white 
                         p-2 sm:p-3 rounded-full hover:bg-gray-600"
            >
              <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white 
                         p-2 sm:p-3 rounded-full hover:bg-gray-600"
            >
              <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hero;
