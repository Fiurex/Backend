const pathHandler = (req, res, next) => {
  const error = "Not Found URL";
  const { method, originalUrl: url } = req;
  res.status(404).json({ error, method, url });
};

export default pathHandler;
