import { useEffect, useState } from "react";
import { StepCard } from "./StepCard";

export function Step({ steps }) {
  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const [pre, setPre] = useState([]);
  const [totalWeek, setTotalWeek] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    selectedStep.prerequisites?.map((p) => {
      const s = steps.find((s) => s.id === p);

      setPre((prev) => [...prev, { title: s.title, id: s.id }]);
    });
  }, [selectedStep, steps]);

  return (
    <>
      <div className="md:flex justify-around  mx-10">
        <div className="">
          {steps.map((step) => (
            <div
              disabled={step.id == selectedStep.id}
              className={`flex  gap-5 py-2 cursor-pointer ${step.id === selectedStep.id ? ` border-b-2 border-b-blue-500  align-middle items-center` : ``} `}
              onClick={() => {
                setSelectedStep(step);
                setPre([]);
              }}
              key={step.id}
            >
              <h1 className="bg-violet-600 p-2 text-white rounded-2xl">
                {step.number}
              </h1>
              <h1 className="text-center items-center p-2">{step.title}</h1>
            </div>
          ))}
        </div>
        {selectedStep && (
          <div className="w-3/5">
            <StepCard step={selectedStep} />
            {pre && (
              <span className="grid grid-cols-3 gap-2 mt-4 justify-between ">
                {pre.map((p) => (
                  <p
                    onClick={() => {
                      setSelectedStep(steps.find((s) => (s.id = p.id)));
                      setPre([]);
                    }}
                    className="text-sm cursor-pointer text-white w-fit px-3 bg-blue-500 text-center rounded-2xl"
                    key={p.id}
                  >
                    {p.title}
                  </p>
                ))}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
