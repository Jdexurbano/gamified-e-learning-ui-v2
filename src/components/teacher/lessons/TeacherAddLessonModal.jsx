import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import { useState } from "react";

function TeacherAddLessonModal({
  open,
  handleOpen,
  fetchLessons,
  setOpenAlert,
}) {
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const clearFields = () => {
    setTitle("");
    setYoutubeLink("");
  };

  const addLesson = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      youtube_link: youtubeLink,
      is_open: true,
    };

    try {
      const response = await axios.post(`${PORT}/lessons`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchLessons();
      setOpenAlert(true);
      clearFields();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen} className="max-w-lg mx-auto">
        {/* Header */}
        <DialogHeader className="flex justify-center">
          <p className="text-xl font-semibold text-purple-800">
            Add YouTube Video
          </p>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="flex flex-col gap-4 px-6 py-4">
          <form
            id="addYouTubeVideo"
            onSubmit={addLesson}
            className="flex flex-col gap-4"
          >
            {/* Title Input */}
            <Input
              label="Title"
              color="purple"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-purple-400"
            />

            {/* YouTube Link Input */}
            <Input
              label="YouTube Link"
              color="purple"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="e.g. https://youtu.be/abcd1234"
              className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-purple-400"
            />
            <p className="text-sm text-gray-500">
              Enter a valid YouTube video URL.
            </p>
          </form>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex justify-center gap-4 py-3">
          <Button onClick={handleOpen} variant="text" color="purple">
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="deep-purple"
            form="addYouTubeVideo"
            type="submit"
            onClick={handleOpen}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default TeacherAddLessonModal;
