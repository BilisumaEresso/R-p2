import { useEffect, useState, useMemo } from "react";
import { StepCard } from "./StepCard";

export function Step({ steps }) {
  const [selectedStep, setSelectedStep] = useState(steps[0]);
  const [completedSteps, setCompletedSteps] = useState([]);

  // --- Derived state (no cascading effects) ---
  const totalWeeks = useMemo(
    () => steps.reduce((sum, step) => sum + step.weeksToFinish, 0),
    [steps],
  );

  const unlockedStepIds = useMemo(() => {
    const maxCompletedId =
      completedSteps.length > 0 ? Math.max(...completedSteps) : 0;
    return steps
      .filter((step) => step.id <= maxCompletedId + 1)
      .map((step) => step.id);
  }, [completedSteps, steps]);

  const progress = useMemo(
    () => (completedSteps.length / steps.length) * 100,
    [completedSteps, steps],
  );

  const prerequisites = useMemo(() => {
    if (!selectedStep?.prerequisites) return [];
    return selectedStep.prerequisites
      .map((id) => steps.find((s) => s.id === id))
      .filter(Boolean);
  }, [selectedStep, steps]);

  // --- Adjust selected step if it becomes locked ---
  useEffect(() => {
    if (selectedStep && !unlockedStepIds.includes(selectedStep.id)) {
      const firstUnlocked = steps.find((step) =>
        unlockedStepIds.includes(step.id),
      );
      if (firstUnlocked) setSelectedStep(firstUnlocked);
    }
  }, [selectedStep, unlockedStepIds, steps]);

  const currentIndex = steps.findIndex((s) => s.id === selectedStep?.id);
  const isStepCompleted = completedSteps.includes(selectedStep?.id);

  const handlePrev = () => {
    if (currentIndex > 0) setSelectedStep(steps[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      // Mark current step as completed if not already
      if (!isStepCompleted) {
        setCompletedSteps([...completedSteps, selectedStep.id]);
      }
      // Move to next step
      setSelectedStep(steps[currentIndex + 1]);
    }
  };

  const handleComplete = () => {
    // Mark current step as completed (no navigation)
    if (!isStepCompleted) {
      setCompletedSteps([...completedSteps, selectedStep.id]);
    }
  };

  return (
    <div className="p-6">
      {/* Header with progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            React to Payment Job Roadmap
          </h1>
          <span className="text-sm text-gray-600">
            Total: {totalWeeks} weeks • Completed: {completedSteps.length}/
            {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="md:flex justify-around gap-8">
        {/* Step list sidebar */}
        <div className="md:w-1/3">
          {steps.map((step) => {
            const isUnlocked = unlockedStepIds.includes(step.id);
            const isSelected = step.id === selectedStep?.id;
            return (
              <div
                key={step.id}
                className={`flex gap-4 py-3 px-2 mb-2 rounded-lg transition-all ${
                  isSelected
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "hover:bg-gray-50"
                } ${!isUnlocked ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
                onClick={() => isUnlocked && setSelectedStep(step)}
              >
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold ${
                    completedSteps.includes(step.id)
                      ? "bg-green-500"
                      : "bg-violet-600"
                  }`}
                >
                  {completedSteps.includes(step.id) ? "✓" : step.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">
                    {step.weeksToFinish} weeks
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected step details */}
        {selectedStep && (
          <div className="md:w-2/3">
            <StepCard step={selectedStep} isCompleted={isStepCompleted} />

            {/* Prerequisites tags */}
            {prerequisites.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Prerequisites:
                </p>
                <div className="flex flex-wrap gap-2">
                  {prerequisites.map((p) => (
                    <span
                      key={p.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {p.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation + Complete buttons */}
            <div className="flex justify-between items-center mt-8 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentIndex === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                ← Previous
              </button>

              {/* Complete button – always visible, disabled when already completed */}
              <button
                onClick={handleComplete}
                disabled={isStepCompleted}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isStepCompleted
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isStepCompleted ? "✓ Completed" : "✓ Mark Complete"}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === steps.length - 1}
                className={`px-6 py-2 rounded-lg font-medium ${
                  currentIndex === steps.length - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next →
              </button>
            </div>

            {/* Optional hint for last step */}
            {currentIndex === steps.length - 1 && !isStepCompleted && (
              <p className="text-sm text-amber-600 mt-2 text-center">
                ✨ This is the final step! Click "Mark Complete" when you're
                done.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
