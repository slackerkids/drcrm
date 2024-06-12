import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  
  const navigate = useNavigate();

  function handleGoBack() {
    window.history.back();
  }

  function handleGoHome() {
    navigate("/");
  }

  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <h1 className="font-manrope mt-3 text-2xl font-normal text-gray-800 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 font-manrope">
            Sorry, the page you are looking for doesn't exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-4 py-3 text-gray-700 transition-colors duration-200 bg-white border rounded-full gap-x-2 sm:w-auto hover:bg-gray-100" onClick={handleGoBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <Button
              type="button"
              className="w-1/2 tracking-wide transition-colors duration-200 shrink-0 sm:w-auto"
              onClick={handleGoHome}
            >
              Take me home
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/src/assets/404.svg"
            alt="Illustration"
          />
        </div>
      </div>
    </section>
  );
}
export default NotFound;
