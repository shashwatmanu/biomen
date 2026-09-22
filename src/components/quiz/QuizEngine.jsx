import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from './QuizQuestions';
import QuizResults from './QuizResults';
import { ArrowLeft } from 'lucide-react';

const QuizEngine = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (option) => {
    const questionId = quizQuestions[currentStep].id;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));

    // Small delay for UX feel
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (isCompleted) {
    return <QuizResults answers={answers} />;
  }

  const currentQuestion = quizQuestions[currentStep];
  const progressPercentage = ((currentStep) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleBack} 
            className={`text-gray-400 hover:text-white transition-colors flex items-center gap-2 ${currentStep === 0 ? 'invisible' : 'visible'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <span className="text-sm font-bold tracking-widest text-[#BFA46A]">
            STEP {currentStep + 1} OF {quizQuestions.length}
          </span>
        </div>
        <div className="w-full h-1 bg-[#111] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#16C784] to-[#BFA46A]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Quiz Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-xl p-8 sm:p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10 text-[#F4F6F2] leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 font-bold text-[15px] sm:text-lg flex items-center justify-between group ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#16C784]/20 to-transparent border border-[#16C784] shadow-[0_0_30px_rgba(22,199,132,0.15)] text-white' 
                      : 'bg-[#111] border border-white/5 text-gray-400 hover:bg-[#1a1a1a] hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center transition-colors ${
                    isSelected ? 'border-[#16C784] bg-[#16C784]' : 'border-gray-600 group-hover:border-white'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizEngine;
