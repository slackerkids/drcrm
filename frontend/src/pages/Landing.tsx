import { useState } from "react";
import { Link } from "react-router-dom";

function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header className="bg-slate-900">
        <nav className="container relative flex items-center justify-between px-6 py-8 mx-auto text-slate-100">
          <img
            src="src/assets/logo_white.png"
            alt="White logo"
            className="w-12 md:w-12 md:h-12"
          />

          <button onClick={() => setOpen(!open)} className="md:hidden">
            <span style={{ display: open ? "none" : "block" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </span>
            <span style={{ display: open ? "block" : "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            className={`absolute inset-x-0 z-30 w-full px-6 py-8 mt-4 space-y-6 transition-all duration-300 ease-in-out bg-gray-700 top-16 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:space-y-0 md:-mx-6 md:flex md:items-center ${
              open ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
            }`}
          >
            <Link
              to="/customers"
              className="block font-manrope text-gray-100 transition-colors duration-300 md:px-6 hover:text-gray-400"
            >
              Customers
            </Link>
            <Link
              to="/leads"
              className="block font-manrope text-gray-100 transition-colors duration-300 md:px-6 hover:text-gray-400"
            >
              Leads
            </Link>
            <Link
              to="/interactions"
              className="block font-manrope text-gray-100 transition-colors duration-300 md:px-6 hover:text-gray-400"
            >
              Interactions
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section>
          <div className="relative grid w-full bg-slate-900 h-96 lg:h-[32rem] place-items-center">
            <div className="flex flex-col items-center mx-auto text-center">
              <h1 className="text-4xl font-semibold text-gray-100  md:text-6xl font-manrope uppercase">
                drcrm
              </h1>
              <p className="mt-6 text-lg leading-5 text-gray-100 font-manrope">
                Your job done here.
              </p>
              <a href="#about" className="mt-8 cursor-pointer animate-bounce">
                <svg
                  width="53"
                  height="53"
                  viewBox="0 0 53 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="27"
                    cy="26"
                    r="18"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <path
                    d="M22.41 23.2875L27 27.8675L31.59 23.2875L33 24.6975L27 30.6975L21 24.6975L22.41 23.2875Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <svg
            className="fill-slate-900"
            viewBox="0 0 1440 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1440 0H0V57C720 0 1440 57 1440 57V0Z" />
          </svg>
        </section>

        <section className="container px-6 py-8 mx-auto lg:py-16" id="about">
          <div className="lg:flex lg:items-center lg:-mx-4">
            <div className="lg:w-1/2 lg:px-4">
              <h3 className="text-xl font-light text-slate-800 md:text-2xl lg:text-3xl font-epilogue">
                Simplify Customer Management
              </h3>
              <p className="mt-6 text-slate-800 font-manrope">
                Effortlessly manage and nurture customer relationships with our
                intuitive CRM solution. Experience seamless integration,
                comprehensive analytics, and powerful automation to drive your
                business forward.
              </p>
              <button className="flex items-center mt-8 -mx-2 text-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mx-1 font-normal font-manrope">PLAY VIDEO</p>
              </button>
            </div>
            <div className="mt-8 lg:w-1/2 lg:px-4 lg:mt-0">
              <img
                className="object-cover w-full rounded-xl h-96"
                src="https://via.placeholder.com/800x600?text=Your+Image"
                alt="Video thumbnail"
              />
            </div>
          </div>
        </section>

        <section className="container px-6 py-8 mx-auto lg:py-16">
          <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 space-y-3 border-2 border-gray-600 rounded-xl">
              <h1 className="text-2xl font-semibold text-slate-700 capitalize font-epilogue">
                Customer Management
              </h1>
              <p className="text-slate-900 font-manrope">
                Efficiently manage your customer base with intuitive tools.
              </p>
              <Link
                to="/customers"
                className="inline-flex p-2 text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-full rtl:-scale-x-100 hover:underline hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 9.293a1 1 0 010 1.414L8.707 14.293a1 1 0 01-1.414-1.414L9.586 10 7.293 7.707a1 1 0 011.414-1.414l3.586 3.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="p-8 space-y-3 border-2 border-gray-600 rounded-xl">
              <h1 className="text-2xl font-semibold text-slate-700 capitalize font-epilogue">
                Close Your Leads
              </h1>
              <p className="text-slate-900 font-manrope">
                Prioritize leads effectively to maximize your sales potential.
              </p>
              <Link
                to="/leads"
                className="inline-flex p-2 text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-full rtl:-scale-x-100 hover:underline hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 9.293a1 1 0 010 1.414L8.707 14.293a1 1 0 01-1.414-1.414L9.586 10 7.293 7.707a1 1 0 011.414-1.414l3.586 3.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="p-8 space-y-3 border-2 border-gray-600 rounded-xl">
              <h1 className=" text-2xl font-semibold text-slate-700 capitalize font-epilogue">
                Track Interactions
              </h1>
              <p className="text-slate-900 font-manrope">
                From emails to phone calls, and meetings to social media
                interactions
              </p>
              <Link
                to="/interactions"
                className="inline-flex p-2 text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-full rtl:-scale-x-100 hover:underline hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rtl:scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 9.293a1 1 0 010 1.414L8.707 14.293a1 1 0 01-1.414-1.414L9.586 10 7.293 7.707a1 1 0 011.414-1.414l3.586 3.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col items-center py-10 text-slate-100 bg-slate-900">
        <p className="text-center font-manrope text-lg">
          Copyright © 2024, DRCRM
        </p>
      </footer>
    </div>
  );
}

export default Landing;
