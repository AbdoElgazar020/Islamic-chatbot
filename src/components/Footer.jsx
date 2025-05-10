import { copyrightSign } from "../assets/icons";
import icon from "../assets/icon.png";
import { footerLinks, socialMedia } from "../constants";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes("login") ||
      location.pathname.includes("register") ? null : (
        <footer className="bg-[#4b2e20] p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
              <div className="flex flex-col items-start">
                <p className="mt-6 text-base leading-7 font-montserrat text-white sm:max-w-sm">
                  مساعد إسلامي مدعوم بتقنيات الذكاء الاصطناعي.
                </p>
                <div className="flex items-center gap-5 mt-8">
                  {socialMedia.map((icon) => (
                    <div
                      className="flex justify-center items-center w-10 h-10 bg-white rounded-full"
                      key={icon.alt}
                    >
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        width={20}
                        height={20}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 justify-end lg:gap-20 gap-10 flex-wrap text-right">
                {footerLinks.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-montserrat text-xl leading-normal font-bold mb-6 text-white">
                      {section.title}
                    </h4>
                    <ul>
                      {section.links.map((link) => (
                        <li
                          className="mt-3 font-montserrat text-base leading-normal text-white hover:text-[#d1b48c]"
                          key={link.name}
                        >
                          <a href={link.link}>{link.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-white mt-20 max-sm:flex-col max-sm:items-center border-t border-[#d1b48c] pt-6">
              <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
                <img
                  src={copyrightSign}
                  alt="علامة حقوق النشر"
                  width={20}
                  height={20}
                  className="rounded-full m-0"
                />
                <p> جميع الحقوق محفوظة.</p>
              </div>
              <p className="font-montserrat cursor-pointer hover:text-[#d1b48c]">
                الشروط والأحكام
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
