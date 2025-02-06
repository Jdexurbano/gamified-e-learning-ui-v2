import { FaTrash } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function DeleteAnnouncementModal({
  id,
  fetchAnnouncement,
  setOpenDeleteAlert,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDeleteAnnouncement = async (e) => {
    e.preventDefault();
    handleOpen();
    try {
      const response = await axios.delete(`${PORT}/announcements/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOpenDeleteAlert(true);
      fetchAnnouncement();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button size="sm" color="red" onClick={handleOpen}>
        <FaTrash />
      </Button>

      <Dialog open={open} handler={handleOpen} className="max-w-sm mx-auto">
        <DialogHeader className="flex justify-center">
          <p className="text-xl font-semibold text-purple-800">
            Delete Announcement
          </p>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center gap-4 px-6">
          <div className="text-center">
            <Typography variant="h6" color="gray">
              Are you sure you want to delete this announcement?
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-2">
              This action cannot be undone.
            </Typography>
          </div>
          <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg w-16 h-16">
            <FaTrash size={32} className="text-red-500" />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <Button variant="text" color="purple" onClick={handleOpen}>
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={handleDeleteAnnouncement}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteAnnouncementModal;
