import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
function StudentMainLessonPage() {
  return (
    <>
      <main className="px-10 py-16">
        <Card className="w-96 shadow-lg rounded-lg">
          <CardHeader floated={false} className="h-56">
            <img
              src="../images/fruity.jpg"
              alt="Fruit Fun Lesson"
              className="object-cover w-full h-full rounded-t-lg"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 font-bold"
            >
              Fruit Fun Lesson
            </Typography>
            <Typography color="gray" className="font-normal">
              Explore an interactive lesson on fruits filled with animations and
              confetti fun!
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to="/student/fruitlesson">
              <Button color="purple" className="w-full" ripple={true}>
                View Lesson
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

export default StudentMainLessonPage;
