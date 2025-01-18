export const notFound = (error, req, res, next) => {
  const statusCode = error.status ?? 500;
  const message =
    typeof error === "string"
      ? error
      : error.message || "An unexpected error occurred";
  res.status(statusCode).json({ message });
};
