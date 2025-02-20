import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

const renderStars = (rating) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, index) =>
        index < rating ? (
          <FaStar key={index} size={20} />
        ) : (
          <FaRegStar key={index} size={20} />
        )
      )}
    </div>
  );
};

function ActivityHistoryPage() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${PORT}/activities`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <main className="w-full max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6">
        Activity History
      </h1>

      <Card className="w-full border rounded-lg shadow-md">
        <CardBody className="p-4">
          <div className="grid grid-cols-2 font-semibold text-purple-800 mb-4">
            <Typography variant="h5">Game</Typography>
            <Typography variant="h5" className="text-right">
              Rating
            </Typography>
          </div>

          {activities.map((entry, index) => (
            <div
              key={entry.id}
              className={`grid grid-cols-2 p-4 my-4 rounded-lg ${
                index % 2 === 0 ? "bg-purple-50" : "bg-white border-2"
              }`}
            >
              <Typography className="text-base font-bold">
                {entry.game}
              </Typography>
              <div className="flex justify-end gap-3 items-center">
                {renderStars(entry.rating)}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </main>
  );
}

export default ActivityHistoryPage;
