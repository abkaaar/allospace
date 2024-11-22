import { LockClosedIcon } from "@radix-ui/react-icons";
import { BookAIcon, ServerIcon } from "lucide-react";
import { DottedBackground } from "./backgrounds/Bcakground";

export default function HostContent() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div> */}
<DottedBackground/>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-[#00593f]">
                What is Allospace
              </p>

              <p className="mt-6 text-xl/2 text-gray-700">
                AlloSpace is a platform designed to help space managers
                seamlessly manage bookings, promote their venues, and connect
                with individuals or businesses looking for workspaces, meeting
                rooms, or event spaces. With user-friendly tools and insightful
                analytics, AlloSpaces empowers you to focus on what matters most
                — providing exceptional experiences for your clients.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            // src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
            src="/hero/Screenshot.jpeg"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p className="text-base/7 mb-5 font-semibold text-[#00593f]">
                Why choose Allospace?
              </p>
              {/* <p>
              1. 1. .
              </p> */}
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <BookAIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-[#00593F]"
                  />
                  <span>
                    Hassle-Free <strong>Booking Management</strong>
                     {" "}Accept and track bookings in real-time. Get <strong>notifications</strong> {" "}
                    for new bookings and changes. Block unavailable dates to
                    prevent scheduling conflicts
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-[#00593F]"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Comprehensive Analytics.
                    </strong>{" "}
                    
Understand booking trends and client preferences.
Access revenue insights to optimize your offerings.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-[#00593F]"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                    Flexible Payment Options.
                    </strong>{" "}
                    
Secure payment processing with Paystack integration.
Easy payment splits, ensuring you get paid on time.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-[#00593F]"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                    Promote Your Space.
                    </strong>{" "}
                   
Showcase amenities, photos, and details to attract more clients.
Leverage SEO-optimized listings to stand out online.
                  </span>
                </li>
              </ul>
            
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
               Join our community.
              </h2>
              <p className="mt-6">
              Connect with other space managers, share tips, and learn from industry experts in our <a href="#">Space Managers Community Forum</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
