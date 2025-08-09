import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content border-t">
      {/* Same container + vertical rhythm as sections */}
      <div className="container-app section-y grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-lg font-bold">FoodShare</h2>
          <p className="text-sm mt-3 leading-relaxed">
            Connecting communities to reduce food waste and share blessings.
            Every meal counts — join us in making a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/available-foods" className="hover:underline">
                Available Foods
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@foodshare.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
          <p className="text-sm">Address: 123 Main St, Irving, TX</p>

          <div className="flex gap-4 mt-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="hover:text-primary transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="hover:text-primary transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:text-primary transition-colors" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar aligned to container too */}
      <div className="bg-base-200">
        <div className="container-app py-4 text-center text-sm">
          © {new Date().getFullYear()} FoodShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
