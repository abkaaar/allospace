import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Notfound: React.FC = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Link to="/" className="underline">
          Go Back Home
        </Link>
        <LazyLoadImage
          src="/not_found.svg"
          className="max-h-64 max-w-64"
          alt="404"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default Notfound;
