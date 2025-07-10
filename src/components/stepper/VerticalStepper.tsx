import { steps } from "@/utils/step";
import { useState } from "react";

export default function VerticalStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-full p-8 space-y-6">
      {steps.map((s, i) => (
        <div key={s.title}>
          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 font-bold text-sm
                ${i === activeStep ? 'border-orange-500' : 'border-gray-300'}
                ${i < activeStep ? 'bg-green-500 text-white' : 'bg-white text-black'}
              `}
            >
              {s.icon}
            </div>

            <div className={`${i === activeStep ? 'font-bold' : 'font-normal'}`}>
              {s.title}
            </div>
          </div>

          {i === activeStep && (
            <div className="ml-8 mt-3 space-y-4">
              <div>{s.component}</div>
              <div className="flex gap-3">
                {activeStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-4 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  >
                    Back
                  </button>
                )}
                {activeStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
