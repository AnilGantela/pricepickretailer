import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGem,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaPrint,
} from "react-icons/fa";

import "./index.css";

const Footer = () => {
  return (
    <footer className=" text-gray-600 text-left text-lg-start ">
      <div className="flex justify-center lg:justify-between p-4 border-b">
        <div className="hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className=" hover:text-green-900">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaGoogle />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaLinkedin />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h6 className="text-lg font-semibold flex items-center">
              <FaGem className="mr-2" /> Price Pick
            </h6>
            <p className="mt-2">
              Providing quality services with excellence and dedication.
            </p>
          </div>
          <div>
            <h6 className="text-lg font-semibold">Products</h6>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Retailer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  mobile App
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  website
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  consumer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold">Useful Links</h6>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold text-left">Contact</h6>
            <p className="flex items-center">
              <FaHome className="mr-2" /> Andhra University, visakhapatnam
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2" /> akgak@gmail.com
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-2" /> 91+ 9110769027
            </p>
            <p className="flex items-center">
              <FaPrint className="mr-2" /> +1 234 567 89
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-4 bg-gray-900">
        © {new Date().getFullYear()} PricePick. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
