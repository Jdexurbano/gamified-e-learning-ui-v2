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

function AddAnnouncementModal({
  open,
  handleOpen,
  fetchAnnouncement,
  setOpenAlert,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const clearFields = () => {
    setTitle("");
    setDescription("");
  };

  const AddAnnouncement = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
    };

    try {
      const response = await axios.post(`${PORT}/announcements`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAnnouncement();
      setOpenAlert();
      clearFields();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen} className="max-w-lg mx-auto">
        <DialogHeader className="flex justify-center">
          <p className="text-xl font-semibold text-purple-800">
            Add Announcement
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 px-6 py-4">
          <form
            id="addAnnouncement"
            onSubmit={AddAnnouncement}
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
            form="addAnnouncement"
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

export default AddAnnouncementModal;
