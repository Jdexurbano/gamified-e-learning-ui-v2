import { useParams } from "react-router-dom";
import { Button, Typography, Card } from "@material-tailwind/react";
function WatchVideo() {
  const { videoId } = useParams(); // Get video ID from URL
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        {/* Back Button */}

        {/* Video Card */}
        <Card className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
          {/* Video Title */}
          <Typography
            variant="h4"
            color="purple"
            className="font-bold text-center mb-4"
          >
            Watch Video
          </Typography>

          {/* Video Player */}
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </Card>
      </div>
    </>
  );
}

export default WatchVideo;
