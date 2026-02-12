// Updated StepCard component with optional completed badge
export function StepCard({ step, isCompleted }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative">
      {isCompleted && (
        <span className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          ✅ Completed
        </span>
      )}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-6xl font-bold text-gray-700">#{step.number}</span>
        <h2 className="text-3xl font-semibold text-gray-900">{step.title}</h2>
      </div>

      <p className="text-gray-700 text-lg mb-4">{step.desc}</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-4xl font-bold text-amber-600">
          {step.weeksToFinish}
        </span>
        <span className="text-lg text-gray-600">
          {step.weeksToFinish === 1 ? "week" : "weeks"}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-700 font-medium">Category:</span>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium uppercase">
          {step.category}
        </span>
      </div>

      {step.resources && step.resources.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-700 font-medium">Resources:</span>
          {step.resources.map((resource, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {resource}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
