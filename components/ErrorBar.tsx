const ErrorBar = ({ error }: { error: String }) => {
  return error ? (
    <div className="inline-block px-4 py-1 shadow-inner rounded-full text-red-600 bg-red-100 text-sm font-medium mt-1">
      {error}
    </div>
  ) : null;
};

export default ErrorBar;
