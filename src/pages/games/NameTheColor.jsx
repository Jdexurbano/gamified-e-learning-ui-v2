import { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import axios from "axios";
import { PORT } from "../../utils/constant";
const colors = [
  { name: "Red", code: "#FF0000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Green", code: "#008000" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Purple", code: "#800080" },
  { name: "Orange", code: "#FFA500" },
  { name: "Pink", code: "#FFC0CB" },
  { name: "Cyan", code: "#00FFFF" },
  { name: "Brown", code: "#A52A2A" },
  { name: "Gray", code: "#808080" },
];

function NameTheColor() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleFinal = async (e) => {
    e.preventDefault();
    const payload = {
      game: "Name the color",
      score: score,
    };

    try {
      const response = await axios.post(`${PORT}/activities`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleOpen();
      setScore(0);
    } catch (error) {
      console.error(error);
    }
  };

  const { name, code } = colors[currentColorIndex];
  const options = colors
    .map((color) => color.name)
    .sort(() => Math.random() - 0.5);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === name) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextColor = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentColorIndex < colors.length - 1) {
      setCurrentColorIndex(currentColorIndex + 1);
    } else {
      //   alert(`Game Over! Your final score is ${score}/${colors.length}`);
      handleOpen();
      setCurrentColorIndex(0);
      //   setScore(0);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
        <motion.h1
          className="text-4xl font-extrabold mb-6 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Name the Color
        </motion.h1>
        <Card className="w-full max-w-lg shadow-lg rounded-xl">
          <CardBody className="flex flex-col items-center text-center p-6">
            <motion.div
              className="w-40 h-40 rounded-md shadow-md mb-6"
              style={{ backgroundColor: code }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showResult}
                  className={`w-full px-4 py-3 text-lg font-semibold rounded-lg shadow-md transition-colors duration-200 ${
                    option === selectedAnswer
                      ? option === name
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showResult && (
              <motion.p
                className="mt-4 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {selectedAnswer === name
                  ? "🎉 Correct!"
                  : `❌ Wrong! The correct color was '${name}'.`}
              </motion.p>
            )}
          </CardBody>
        </Card>
        {showResult && (
          <Button
            onClick={handleNextColor}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Next Color
          </Button>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Score: <span className="text-indigo-700">{score}</span>/
          {colors.length}
        </p>

        <Dialog open={open} handler={handleOpen} className="max-w-sm mx-auto">
          <DialogHeader className="flex justify-center">
            <p className="text-xl font-semibold text-blue-500">
              Name The Color
            </p>
          </DialogHeader>
          <DialogBody className="flex flex-col items-center gap-4 px-6">
            <div className="text-center">
              <Typography variant="h6" color="gray">
                Hello there! here is your score!
              </Typography>
            </div>
            <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg w-16 h-16">
              <p className="text-xl text-blue-900 font-bold"> {score}</p>
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-center gap-4">
            <Button variant="text" color="light-blue" onClick={handleFinal}>
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="light-blue" onClick={handleFinal}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}

export default NameTheColor;
