
const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-medium">Contact:</span>
            <span>A. Naveen</span>
            <span className="hidden sm:inline">|</span>
            <span className="sm:ml-1">Cell: 9494719306</span>
            <span className="hidden sm:inline">|</span>
            <span className="sm:ml-1">algotnaveen@gmail.com</span>
          </div>
          <div className="text-gray-300">
            <span>©2024 Algot Academy | All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
