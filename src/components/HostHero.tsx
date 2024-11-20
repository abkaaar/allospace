
const HostHero = () => {
    // const [RegisterFormOpen, setRegisterFormOpen] = useState(false)
    const handleGetStartedClick = (e:React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault();
        // Toggle the hidden div to become visible
        const hiddenDiv = document.getElementById('form');
        if (hiddenDiv) {
          hiddenDiv.classList.remove('hidden');
          hiddenDiv.classList.add('flex');
          hiddenDiv.scrollIntoView({behavior: 'smooth'})
        }
      };
    
      const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Scroll to the element with id 'learn-more'
        const learnMoreDiv = document.getElementById('learn-more');
        if (learnMoreDiv) {
          learnMoreDiv.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <div className="flex items-center relative isolate px-6 lg:px-8 bg-[url('/offices/hosthero.jpg')] bg-no-repeat bg-center bg-cover h-5/6">
      <div className="max-w-4xl py-20 sm:py-20 lg:py-20"> 
        <div className="text-start">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Manage Your Space, Maximize Your Impact
          </h1>
          <p className="mt-8 text-pretty text-white text-md font-light sm:text-xl/7">
            Simplify bookings, showcase your space, and grow your business with
            AlloSpaces. From seamless scheduling to secure payments, we provide
            everything you need to run your space effortlessly — all in one
            place. Let’s make your space the go-to destination!
          </p>
          <div 
          className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              onClick={handleGetStartedClick}
              className="rounded-md bg-[#00593F] px-5 py-2.5 text-sm font-normal text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Get started
            </a>
            <a href="#" 
             onClick={handleLearnMoreClick}
            className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostHero;
