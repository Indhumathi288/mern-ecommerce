const CheckoutSteps = ({ step }) => {
  const steps = ["Address", "Summary", "Payment", "Success"];

  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`flex-1 text-center py-2 border-b-4 ${
            step >= index + 1
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-gray-300 text-gray-400"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
