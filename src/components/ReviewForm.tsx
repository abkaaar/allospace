import { useState } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface ReviewFormComponentProps {
  onSubmit: (reviewData: { rating: number; review: string; date: string }) => void;
}

const ReviewFormComponent = ({ onSubmit }: ReviewFormComponentProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (review.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }

    // Create review object
    const reviewData = {
      rating,
      review: review.trim(),
      date: new Date().toISOString(),
    };

    // Call the onSubmit prop with the review data
    onSubmit(reviewData);
    
    // Reset form
    setRating(0);
    setReview('');
    setSubmitted(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className="focus:outline-none"
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(star)}
      >
        <Star
          size={16}
          className={`transition-colors ${
            star <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <Card className="max-w-2xl p-3 mx-6 mt-8 bg-white rounded-lg shadow-sm">
      <CardTitle className="text-md font-semibold mb-1">Write a Review</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-1 mb-2">
            {renderStars()}
          </div>
        </div>

        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full min-h-[70px] p-3 border rounded-md text-sm focus:ring-2 focus:ring-[#00593F] focus:border-[#00593F] bg-white"
            placeholder="What did you like or dislike about the hub? and What did you use this workspace for?"
          />
          <p className="mt-1 text-sm text-gray-500">
            {review.length} / 500 characters
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {submitted && (
          <div className="text-[#00593F] text-sm">
            Thank you for your review!
          </div>
        )}

        <Button
            variant={'primary'}
          type="submit"
          className="py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitted}
          
        >
          Submit Review
        </Button>
      </form> 
      </CardContent>
     
    </Card>
  );
};

const ReviewForm = () => {
  const handleSubmit = (reviewData: { rating: number; review: string; date: string }) => {
    console.log('Submitted review:', reviewData); 
 
  };

  return <ReviewFormComponent onSubmit={handleSubmit} />;
};

export default ReviewForm;