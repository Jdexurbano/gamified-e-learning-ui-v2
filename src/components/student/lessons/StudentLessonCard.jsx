import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLessonCard({ data }) {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  // Extract video ID from YouTube link
  const getYouTubeID = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.substring(1); // Extracts ID from "youtu.be/{videoID}"
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v"); // Extracts ID from "?v=videoID"
      }
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  const videoId = getYouTubeID(data.youtube_link);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
  return (
    <>
      <Card className="w-full border rounded-lg shadow-md">
        <CardHeader
          color="blue-gray"
          className="relative aspect-[16/9]"
          floated={false}
        >
          <img
            src={thumbnailUrl}
            alt={data.title}
            className="object-cover w-full h-full hover:opacity-90 cursor-pointer rounded-lg"
          />
        </CardHeader>
        <CardBody className="p-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 font-semibold"
          >
            {data.title}
          </Typography>
        </CardBody>
        <CardFooter className="pt-4">
          {data.is_open ? (
            <Button
              color="deep-purple"
              className="w-full"
              onClick={() => navigate(`/student/watch/${videoId}`)}
            >
              Learn now
            </Button>
          ) : (
            <Button color="deep-purple" className="w-full" disabled={true}>
              Not available
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default StudentLessonCard;
