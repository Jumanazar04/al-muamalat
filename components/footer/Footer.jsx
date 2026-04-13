import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#009688] text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          
          {/* LOGO */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/LogoFooter.svg"
              alt="Al-Muamalat Logo"
              width={120}
              height={80}
            />
          </div>

          {/* NAVIGATION */}
          <ul className="flex flex-col md:flex-row gap-4 text-center md:text-left">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>

          {/* SOCIAL MEDIA */}
          <div className="flex justify-center md:justify-end gap-4 text-lg">
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
              <FontAwesomeIcon icon={faTelegram} />
            
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} Al-Muamalat. All rights reserved.
        </div>

      </div>
    </footer>
  );
}