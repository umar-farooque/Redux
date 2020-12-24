const logger = (param) => (state) => (next) => (action) => {
  console.log("Logging", param);
  next(action);
};
export default logger;
