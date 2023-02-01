export const response = (
  res,
  statusCode = 200,
  success = false,
  message = "",
  data = null
) => {
  res.status(statusCode);
  res.json({
    success,
    message,
    data,
  });

  res.end();
};
