import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { FaBullhorn, FaTimeline } from "react-icons/fa6";

function StudentAnnouncementModal({ open, handleOpen, title, description }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen} className="rounded-xl shadow-lg">
        {/* Header */}
        <DialogHeader className="flex items-center justify-between bg-purple-500 text-white p-4 rounded-t-xl">
          <div className="flex items-center gap-2">
            <FaBullhorn className="w-5 h-5" />
            <p className="text-lg font-semibold">Announcement</p>
          </div>
          <button
            onClick={handleOpen}
            className="text-white hover:bg-purple-600 p-1 rounded-full transition duration-300"
          >
            {/* <FaTimeline className="w-5 h-5" /> */}
          </button>
        </DialogHeader>

        {/* Body */}
        <DialogBody className="p-6 bg-gray-50">
          <form className="space-y-4">
            <div>
              <Input
                label="Title"
                color="purple"
                value={title}
                readOnly
                className="bg-white rounded-md shadow-sm"
              />
            </div>
            <div>
              <Textarea
                label="Description"
                color="purple"
                value={description}
                readOnly
                className="bg-white rounded-md shadow-sm"
              />
            </div>
          </form>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="p-4 bg-gray-100 rounded-b-xl flex justify-end">
          <Button
            variant="gradient"
            color="purple"
            className="px-6 py-2 rounded-md shadow-md hover:bg-purple-600 transition duration-300"
            onClick={handleOpen}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default StudentAnnouncementModal;
