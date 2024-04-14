import { Link } from "react-router-dom";
import { Image } from "../../../types/Job";
import "./PostCard.css";

interface IPostCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  date: string;
  images: Image[];
}

const PostCard = ({
  id,
  title,
  description,
  price,
  date,
  images,
}: IPostCardProps) => {
  return (
    <Link to={`jobs/${id}`}>
      <div className="max-w-xl h-full mx-auto bg-white rounded-xl shadow-md overflow-hidden m-3">
        <div className="xl:flex xl:flex-col">
          <div className="xl:flex-shrink-0 m-3">
            {/* Image */}
            <div className="h-48 w-full object-cover xl:h-48 xl:w-full overflow-hidden">
              <img
                src={process.env.REACT_APP_API_URL + "/" + images?.[0]?.url}
                alt="Post"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <div className="p-8">
            {/* Title */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
              {title}
            </div>
            {/* Description */}
            <p className="mt-2 text-gray-500 mb-4 overflow-hidden description">
              {description}
            </p>
            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">$</span>
                <span className="font-bold text-xl">{price}</span>
              </div>
              {/* Date */}
              <div className="text-gray-500">
                {new Date(date).toLocaleDateString("de-de")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
