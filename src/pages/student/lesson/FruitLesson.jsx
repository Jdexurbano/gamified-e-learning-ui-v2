import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
const slides = [
  {
    title: "🍇 Welcome to the Fruit Fun Lesson! 🍎",
    content:
      "Hey kids! Today, we're going to explore yummy fruits and learn why they are awesome for your body! 😃",
  },
  {
    title: "🍎 Apple",
    content:
      "Apples are crunchy and sweet 🍏. They help keep your body strong and your smile bright! 😊",
  },
  {
    title: "🍌 Banana",
    content:
      "Bananas are soft and full of energy 🍌. They are perfect for a quick snack before playtime! ⚡",
  },
  {
    title: "🍊 Orange",
    content:
      "Oranges are juicy and tangy 🍊. They are packed with vitamin C to help you fight off germs! 💪",
  },
  {
    title: "🥳 Conclusion",
    content:
      "Fruits are fun, tasty, and healthy! Enjoy your fruits and be a superhero every day! 🚀",
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

function FruitLesson() {
  const [page, setPage] = useState(0);

  const nextSlide = () => {
    setPage((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setPage((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <>
      <div className="min-h-screen relative flex flex-col items-center justify-start bg-gradient-to-br from-indigo-100 to-pink-100 text-gray-900">
        {page === slides.length - 1 && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}
        <div className="w-full max-w-5xl p-12">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={page}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-10"
            >
              <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
                {slides[page].title}
              </h1>
              <p className="text-2xl leading-relaxed">{slides[page].content}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex justify-between">
            <button
              onClick={prevSlide}
              disabled={page === 0}
              className={`py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none ${
                page === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              disabled={page === slides.length - 1}
              className={`py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none ${
                page === slides.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FruitLesson;
