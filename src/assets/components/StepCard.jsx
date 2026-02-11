export function StepCard({ step }) {
  return (
    <div className="flex flex-col   items-center text-center">
      <span className="flex items-center gap-6 align-middle text-center">
        <h1 className="text-6xl ">#{step.number}</h1>
        <h1 className="text-5xl">{step.title}</h1>
      </span>
      <p>{step.desc}</p>
      <span className="flex my-5 text-amber-500">
        <h1 className="text-5xl">{step.weeksToFinish}</h1>
        <p>weeks</p>
      </span>

      <span className="flex gap-2 mb-4 align-middle items-center">
        <p className="text-2xl">Category: </p>
        <p className="uppercase text-3xl bg-amber-400 px-2 rounded">
          {step.category}
        </p>
      </span>
      <span className="flex gap-3 ">
        <p>Resources </p>
        {step.resources?.map((r, index) => (
          <span key={index}>
            <p>{r}</p>
          </span>
        ))}
      </span>
      
    </div>
  );
}
