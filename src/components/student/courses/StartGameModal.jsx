import { FaTrash } from "react-icons/fa6";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function StartGameModal({ open, handleOpen, data }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${data.code}`);
      handleOpen();
    }, 2000);
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader className="flex justify-center">
          <Typography variant="h5" color="blue-gray">
            {data.name}
          </Typography>
        </DialogHeader>
        <DialogBody divider className="flex flex-col items-center">
          {/* Game Image */}
          <img
            src={`../images/${data.code}.png`}
            alt="game-image"
            className="object-cover w-full h-48 rounded-lg mb-4"
          />
          {/* Game Title */}
          <Typography className="text-center text-sm text-gray-600">
            {data.description}
          </Typography>
        </DialogBody>
        <DialogFooter className="flex justify-center gap-4">
          <Button color="deep-purple" variant="text" onClick={handleOpen}>
            Cancel
          </Button>
          <Button
            loading={loading}
            color="deep-purple"
            onClick={() => {
              handleNavigate(data);
            }}
          >
            Start Game
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default StartGameModal;
