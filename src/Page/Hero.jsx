import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import team1 from "../assets/Abdo.jpg";
import team2 from "../assets/Hossam.jpg";
import team3 from "../assets/Atwan.jpg";
import team4 from "../assets/Youssef.jpg";
import team5 from "../assets/Hamza.jpg";
import team6 from "../assets/Randa.jpg";
import team7 from "../assets/Ehab.jpg";
import Footer from "../components/Footer";

const teamMembers = [
  { img: team1, name: "عبده الجزار", role: "Frontend Developer" },
  { img: team2, name: "حسام الجنايني", role: "Backend Developer" },
  { img: team3, name: "محمد عطوان", role: "AI Developer" },
  { img: team4, name: "يوسف خلف", role: "AI Developer" },
  { img: team5, name: "حمزه مجدي", role: "Mobile Developer" },
  { img: team6, name: "رندا حمادة", role: "AI Developer" },
  { img: team7, name: "ايهاب غلاب", role: "AI Developer" },
  ,
];

const Hero = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

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
      <main className="relative h-[100vh] bg-[#4b3b34] flex items-center justify-center text-center p-6 font-[Amiri]">
        <div className="w-[50%] max-sm:w-[90%] max-md:w-[80%] max-lg:w-[70%] text-[#ffffff]">
          <h1 className="text-4xl font-bold mb-6 tracking-wide">
            أهلًا بك في منصّتنا
          </h1>
          <p className="text-[#cfc5bc] mb-6 text-lg leading-relaxed">
            نحن فريق يعمل بشغف على تقديم حلول ذكية مستوحاة من تراثنا وثقافتنا
            العربية.
          </p>
          <div className="bg-[#6a5c51] p-6 rounded-lg shadow-lg border border-[#2c221d]">
            <h2 className="text-2xl text-white font-semibold mb-2">خدماتنا</h2>
            <p className="text-[#f5f5f5] text-base">
              استكشف روبوتاتنا الذكية للمساعدة، الفهم، والتشخيص.
            </p>
          </div>
        </div>
      </main>

      <section
        id="about-us"
        className="p-6 bg-[#f7f4f1] text-right font-[Amiri]"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-[#4b2e20]">من نحن</h1>
          <p className="text-[#5c4b45] mb-6 text-lg leading-relaxed">
            نحن فريق من المطورين والمصممين المتحمسين لخلق حلول مبتكرة تسهّل حياة
            الناس، ونهدف لتقديم تقنيات روبوتات محادثة متقدمة لخدمة الأفراد
            والشركات.
          </p>

          <div className="bg-[#e8ddd5] p-4 rounded-lg mt-10 shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-2 text-[#4b2e20]">
              فريقنا
            </h2>
            <p className="text-[#5c4b45] text-center text-base">
              تعرّف على أعضاء فريقنا المتخصصين في الذكاء الاصطناعي، تطوير
              البرمجيات، وتصميم تجربة المستخدم.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative w-full max-w-3xl mx-auto mt-10 mb-12 overflow-hidden">
            <div
              className="flex gap-6 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / visibleCards)}%)`,
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#f5f2ef] rounded-xl shadow-md p-4 w-full sm:w-1/2 lg:w-1/3 text-center flex-shrink-0 border border-[#ddd0c8]"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold text-[#4b2e20]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#6d5d56]">{member.role}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#4b2e20] text-white p-2 rounded-full hover:bg-[#3a2215]"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4b2e20] text-white p-2 rounded-full hover:bg-[#3a2215]"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Hero;
