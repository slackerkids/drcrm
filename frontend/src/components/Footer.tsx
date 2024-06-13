function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200 font-manrope">
        <div className="max-w-screen-xl mx-auto p-4 flex justify-center items-center">
          <span className="text-gray-700 text-sm md:text-base">
            &copy; {new Date().getFullYear()} DRCRM. All rights reserved.
          </span>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  