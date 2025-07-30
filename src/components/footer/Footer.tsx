import { A_LOGO, G_LOGO } from "@/constants/url/URL";
import React from "react";
import { FaLinkedin, FaInstagram, FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center font-medium text-lg">
          For better experience, <span className="font-semibold">download the Swiggy app now</span>
        </div>
        
        {/* App Buttons */}
        <div className="flex justify-center mb-12 gap-4">
          <img src={G_LOGO} alt="Google Play" className="h-12" />
          <img src={A_LOGO} alt="App Store" className="h-12" />
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Swiggy Corporate", "Careers", "Team", "Swiggy One", "Swiggy Instamart", "Swiggy Dineout", "Swiggy Genie", "Minis", "Pyng"].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact us</h4>
            <ul className="space-y-2">
              {["Help & Support", "Partner with us", "Ride with us"].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>

            <h4 className="font-semibold mt-6 mb-3">Legal</h4>
            <ul className="space-y-2">
              {["Terms & Conditions", "Cookie Policy", "Privacy Policy", "Investor Relations"].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Available In */}
          <div>
            <h4 className="font-semibold mb-3">Available in:</h4>
            <ul className="space-y-2">
              {["Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune"].map(city => (
                <li key={city}><a href="#">{city}</a></li>
              ))}
              <li>
                <select className="mt-2 border text-sm px-2 py-1 rounded">
                  <option>679 cities</option>
                </select>
              </li>
            </ul>
          </div>

          {/* Life at Swiggy */}
          <div>
            <h4 className="font-semibold mb-3">Life at Swiggy</h4>
            <ul className="space-y-2">
              {["Explore with Swiggy", "Swiggy News", "Snackables"].map(item => (
                <li key={item}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-3">Social Links</h4>
            <div className="flex space-x-4 text-xl mt-2">
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaPinterestP /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-sm text-gray-500 mt-10">
          © 2025 Swiggy Limited
        </div>
      </div>
    </footer>
  );
};

export default Footer;
