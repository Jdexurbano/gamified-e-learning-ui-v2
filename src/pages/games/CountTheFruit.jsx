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

const fruits = [
  { name: "Apples", emoji: "🍎", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Bananas", emoji: "🍌", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Oranges", emoji: "🍊", count: Math.floor(Math.random() * 10) + 1 },
  { name: "Grapes", emoji: "🍇", count: Math.floor(Math.random() * 10) + 1 },
];

function CountTheFruit() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleFinal = () => {
    handleOpen();
    setScore(0);
  };

  const { name, emoji, count } = fruits[currentFruitIndex];

  const handleCheckAnswer = () => {
    if (parseInt(inputValue) === count) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextFruit = () => {
    setInputValue("");
    setShowResult(false);
    if (currentFruitIndex < fruits.length - 1) {
      setCurrentFruitIndex(currentFruitIndex + 1);
    } else {
      //   alert(`Game Over! Your final score is ${score}/${fruits.length}`);
      handleOpen();
      setCurrentFruitIndex(0);
      //   setScore(0);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-50 p-6">
        <motion.h1
          className="text-4xl font-extrabold mb-6 text-green-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Count the Fruit
        </motion.h1>
        <Card className="w-full max-w-lg shadow-lg rounded-xl">
          <CardBody className="flex flex-col items-center text-center p-6">
            <motion.div
              className="text-6xl mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: count }).map((_, index) => (
                <span key={index}>{emoji}</span>
              ))}
            </motion.div>
            <p className="text-xl font-medium mb-4">
              How many <span className="text-green-700 font-bold">{name}</span>{" "}
              do you see?
            </p>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-32 px-4 py-2 mb-4 text-center text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter number"
              disabled={showResult}
            />
            {showResult && (
              <motion.p
                className="text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {parseInt(inputValue) === count
                  ? "🎉 Correct!"
                  : `❌ Wrong! The correct number was ${count}.`}
              </motion.p>
            )}
          </CardBody>
        </Card>
        {showResult ? (
          <Button
            onClick={handleNextFruit}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Next Fruit
          </Button>
        ) : (
          <Button
            onClick={handleCheckAnswer}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 transition-all"
          >
            Check Answer
          </Button>
        )}
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Score: <span className="text-green-700">{score}</span>/{fruits.length}
        </p>

        <Dialog open={open} handler={handleOpen} className="max-w-sm mx-auto">
          <DialogHeader className="flex justify-center">
            <p className="text-xl font-semibold text-green-500">
              Count the fruits
            </p>
          </DialogHeader>
          <DialogBody className="flex flex-col items-center gap-4 px-6">
            <div className="text-center">
              <Typography variant="h6" color="gray">
                Hello there! here is your score!
              </Typography>
            </div>
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg w-16 h-16">
              <p className="text-xl text-green-900 font-bold"> {score}</p>
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-center gap-4">
            <Button variant="text" color="light-green" onClick={handleFinal}>
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="light-green"
              onClick={handleFinal}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
}

export default CountTheFruit;
