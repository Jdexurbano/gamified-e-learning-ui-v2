import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
function CourseCard({ data, fetchCourses, id }) {
  const [open, setOpen] = useState(data.is_open);
  const handleOpen = () => setOpen(!open);
  const updateToFalse = async (e) => {
    e.preventDefault();

    const payload = {
      name: data.name,
      description: data.description,
      code: data.code,
      is_open: false,
    };

    try {
      const response = await axios.put(`${PORT}/games/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchCourses();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateToTrue = async (e) => {
    e.preventDefault();

    const payload = {
      name: data.name,
      description: data.description,
      code: data.code,
      is_open: true,
    };

    try {
      const response = await axios.put(`${PORT}/games/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchCourses();
    } catch (error) {
      console.error(error.message);
    }
  };
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

export default CourseCard;
