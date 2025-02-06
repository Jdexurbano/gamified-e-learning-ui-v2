import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import StartGameModal from "./StartGameModal";

function StudentCourseCard({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Card className="w-full border rounded-lg shadow-md">
        <CardHeader
          color="blue-gray"
          className="relative aspect-[4/3]"
          floated={false}
        >
          <img
            src={`../images/${data.code}.png`}
            alt="card-image"
            className="object-cover w-full h-full hover:opacity-90"
          />
        </CardHeader>
        <CardBody className="p-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 font-semibold"
          >
            {data.name}
          </Typography>
          <Typography className="text-sm text-gray-600">
            {data.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-4">
          {data.is_open ? (
            <Button color="deep-purple" className="w-full" onClick={handleOpen}>
              Play now
            </Button>
          ) : (
            <Button color="deep-purple" className="w-full" disabled={true}>
              Not available
            </Button>
          )}
        </CardFooter>
      </Card>
      <StartGameModal open={open} handleOpen={handleOpen} data={data} />
    </>
  );
}

export default StudentCourseCard;
