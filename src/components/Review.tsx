import { Star, StarHalf } from 'lucide-react';
import React from 'react';
import { Card } from './ui/card';

interface ReviewProps {
    username: string; // Assuming username is a string
    rating: number;   // Assuming rating is a number
    review: string;   // Assuming review is a string
    date: string;     // Assuming date is a string (e.g., ISO format or human-readable)
  }

const Review: React.FC<ReviewProps> = ({ username, rating, review, date }) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="fill-yellow-400 text-yellow-400"
          size={20}
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="fill-yellow-400 text-yellow-400"
          size={20}
        />
      );
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-star-${i}`}
          className="text-gray-300"
          size={20}
        />
      );
    }

    return stars;
  };

  // Format the date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="max-w-2xl rounded-lg bg-white p-3 mx-6 mt-8 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="ml-2 text-lg font-medium text-gray-900">{username}</h3>
        </div>
        <span className="text-sm text-gray-500">{formatDate(date)}</span>
      </div>
      
      <div className="flex mb-2">
        {renderStars(rating)}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
      
      <p className="text-gray-700 mt-2">{review}</p>
    </Card>
  );
};

// Example usage
const ReviewComponent = () => {
  const sampleReview = {
    username: "JohnDoe",
    rating: 4,
    review: "Great product! Really exceeded my expectations. The quality is outstanding and the customer service was excellent. Would definitely recommend to others.",
    date: "2024-12-23"
  };

  return <Review {...sampleReview} />;
};

export default ReviewComponent;