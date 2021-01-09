class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a message property
    this.code = errorCode; //Adds a code property to the Error object from which we are extended
  }
}

module.exports = HttpError;
