import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const words = [
  { word: "apple", missing: "p" },
  { word: "banana", missing: "n" },
  { word: "grape", missing: "a" },
  { word: "orange", missing: "g" },
  { word: "peach", missing: "c" },
];

function FindMissingLetter() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleFinal = () => {
    handleOpen();
    setScore(0);
  };
  const { word, missing } = words[currentWordIndex];
  const options = [
    missing,
    String.fromCharCode(missing.charCodeAt(0) + 1),
    String.fromCharCode(missing.charCodeAt(0) - 1),
  ].sort(() => Math.random() - 0.5);

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    if (letter === missing) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextWord = () => {
    setSelectedLetter(null);
    setShowResult(false);
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      //   alert(`Game Over! Your final score is ${score}/${words.length}`);
      handleOpen();
      setCurrentWordIndex(0);
      //   setScore(0);
    }
  };

  const displayWord = word.replace(missing, "_");
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-50">
        <motion.h1
          className="text-3xl font-bold mb-4 text-blue-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          Find the Missing Letter
        </motion.h1>
        <Card className="w-full max-w-md">
          <CardBody className="text-center">
            <motion.h2
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {displayWord}
            </motion.h2>
            <div className="flex justify-center gap-4">
              {options.map((letter, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelectLetter(letter)}
                  disabled={showResult}
                  className={`px-4 py-2 rounded-full text-lg font-bold text-gray-900 ${
                    letter === selectedLetter
                      ? letter === missing
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {letter}
                </Button>
              ))}
            </div>
            {showResult && (
              <motion.p
                className="mt-4 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {selectedLetter === missing
                  ? "🎉 Correct!"
                  : `❌ Wrong! The correct letter was '${missing}'.`}
              </motion.p>
            )}
          </CardBody>
        </Card>
        {showResult && (
          <Button
            onClick={handleNextWord}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold"
          >
            Next Word
          </Button>
        )}
        <p className="mt-4 text-lg font-medium">
          Score: {score}/{words.length}
        </p>
        <Button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold">
          Back
        </Button>

        <Dialog open={open} handler={handleOpen} className="max-w-sm mx-auto">
          <DialogHeader className="flex justify-center">
            <p className="text-xl font-semibold text-blue-500">
              Find The Missing Letter
            </p>
          </DialogHeader>
          <DialogBody className="flex flex-col items-center gap-4 px-6">
            <div className="text-center">
              <Typography variant="h6" color="gray">
                Hello there! here is your score!
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-500 mt-2"
              ></Typography>
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

export default FindMissingLetter;
