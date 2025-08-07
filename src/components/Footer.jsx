import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-y-8 gap-x-10">
        {/* Column 1 */}
        <div className="flex flex-col">
          <h3 className="footer-title">FoodShare</h3>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms & Conditions</a>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col">
          <h3 className="footer-title">Support</h3>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">FAQs</a>
          <a className="link link-hover">Report a Problem</a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col">
          <h3 className="footer-title">Follow Us</h3>
          <div className="grid grid-flow-col gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
