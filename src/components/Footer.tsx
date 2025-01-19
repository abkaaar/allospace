const Footer = () => {
  return (
    <>
      {/* <footer className="bg-[#F5F5F5] h-96 py-8 sm:px-20">
        <div className="row grid">
          <div className="col">
            <h2 className="font-bold">Got a question?</h2>
            <div className="flex flex-col mt-3 gap-2">
              <a href="" className="font-normal">
                Call us:+234 908199 7316
              </a>
              <a href="" className="font-normal">
                Email us:help@allospace.com
              </a>
            </div>
          </div>
          <div className="col">
            <h2 className="font-bold">Got a question?</h2>
            <div className="flex flex-col mt-3 gap-2">
              <a href="" className="font-normal">
                Call us:+234 908199 7316
              </a>
              <a href="" className="font-normal">
                Email us:help@allospace.com
              </a>
            </div>
          </div>
          <div className="col">
            <h2 className="font-bold">Got a question?</h2>
            <div className="flex flex-col mt-3 gap-2">
              <a href="" className="font-normal">
                Call us:+234 908199 7316
              </a>
              <a href="" className="font-normal">
                Email us:help@allospace.com
              </a>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="bg-[#041410] pt-12 pb-8 px-4">
        <div className="mx-auto px-4 container overflow-hidden flex flex-col lg:flex-row justify-between">
          <a href="/" className="block mr-4 w-1/3 text-2xl text-white">
            {/* <img src="https://i.imgur.com/JYin6lK.png" className="w-40 ml-4 lg:ml-0" alt="logo"/> */}
            allospace.co
          </a>
          <div className="w-2/3 block sm:flex text-sm mt-6 lg:mt-0">
            <ul className="text-white list-none p-0 font-thin flex flex-col text-left w-full">
              <li className="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Product</li>
              <li><a href="#" className="inline-block py-2 px-3 text-white font-normal">Blog</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white font-normal">Resources</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white font-normal">Pricing</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white font-normal">FAQ</a></li>
            </ul>
            <ul className="text-white list-none p-0 font-thin flex flex-col text-left w-full">
              <li className="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Company</li>
              <li><a href="#" className="inline-block py-2 px-3 text-white  no-underline font-normal">About</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white  no-underline font-normal">Careers</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white  no-underline font-normal">Privacy policy</a></li>
              <li><a href="#" className="inline-block py-2 px-3 text-white  no-underline font-normal">Terms of Service</a></li>
            </ul>


            <div className="text-white flex flex-col w-full">
              <div className="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Follow Us</div>
              <div className="flex gap-3 pl-4 justify-start mt-2">
                <a className="flex items-center text-white no-underline" href="https://www.facebook.com/share/14iBsRb47q/?mibextid=wwXIfr" target="_blank">
                  <svg viewBox="0 0 24 24" className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" /></svg>
                </a>

                <a className="flex items-center text-white no-underline" href="https://www.instagram.com/allospace.co?igsh=NzJ1cmxtaDNlM2tl&utm_source=qr" target="_blank">
                  <svg viewBox="0 0 24 24" className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a className="flex items-center text-white no-underline" href="https://x.com/allospaces?s=21" target="_blank">
                  <svg viewBox="0 0 24 24" className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-6 text-white border-t border-white text-center"> © 2024 Allospace. All rights reserved.</div>
      </footer>
    </>
  );
};

export default Footer;
