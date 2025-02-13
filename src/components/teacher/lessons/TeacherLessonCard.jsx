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
import { PORT } from "../../../utils/constant";
import axios from "axios";
function TeacherLessonCard({ data, id, fetchLessons }) {
  const navigate = useNavigate();
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

  const updateToFalse = async (e) => {
    e.preventDefault();

    const payload = {
      title: data.title,
      youtube_link: data.youtube_link,
      is_open: false,
    };

    try {
      const response = await axios.put(`${PORT}/lessons/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchLessons();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateToTrue = async (e) => {
    e.preventDefault();

    const payload = {
      title: data.title,
      youtube_link: data.youtube_link,
      is_open: true,
    };

    try {
      const response = await axios.put(`${PORT}/lessons/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchLessons();
    } catch (error) {
      console.error(error.message);
    }
  };
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
              onClick={updateToFalse}
            >
              Disable
            </Button>
          ) : (
            <Button
              color="deep-purple"
              className="w-full"
              variant="text"
              onClick={updateToTrue}
            >
              Enable
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default TeacherLessonCard;
