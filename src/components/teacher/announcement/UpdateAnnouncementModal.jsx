import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function UpdateAnnouncementModal({
  data,
  id,
  fetchAnnouncement,
  setOpenUpdateAlert,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);

  const updateAnnouncement = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
    };

    const payload = JSON.stringify(data);

    try {
      const response = await axios.put(`${PORT}/announcements/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAnnouncement();
      setOpenUpdateAlert(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button size="sm" color="deep-purple" onClick={handleOpen}>
        <FaPenToSquare size={12} />
      </Button>
      <Dialog open={open} handler={handleOpen} className="max-w-lg mx-auto">
        <DialogHeader className="flex justify-center">
          <p className="text-xl font-semibold text-purple-800">
            Update Announcement
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 px-6 py-4">
          <form
            id="updateForm"
            onSubmit={updateAnnouncement}
            className="flex flex-col gap-4"
          >
            <div>
              <Input
                label="Title"
                color="purple"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none  focus:ring-purple-400"
              />
            </div>

            <div>
              <Textarea
                label="Description"
                color="purple"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-purple-400"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4 py-3">
          <Button
            onClick={handleOpen}
            variant="text"
            color="purple"
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="deep-purple"
            form="updateForm"
            type="submit"
            onClick={handleOpen}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default UpdateAnnouncementModal;
