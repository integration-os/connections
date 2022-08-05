const { formatDistance } = require("date-fns");

const run = (input) => {
  const { timestamp } = input;

  verifyInput(input);

  try {
    const start = timestamp * 1000; // Convert timestamp to milliseconds
    const end = new Date();

    const timeInBetween = calculateTimeBetween({
      start,
      end,
    });

    const relativeTime = formatDistance(start, end, {
      addSuffix: true,
    });

    return {
      timeInBetween,
      relativeTime,
    };
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {},
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ timestamp }) => {
  const ERRORS = {
    NO_TIMESTAMP: "No timestamp was provided in the input.",
  };

  if (typeof timestamp === "undefined") throw new Error(ERRORS.NO_TIMESTAMP);
};

/**
 * Calculates time between two dates
 *
 * @param {String} regExp - The regular expression to check against
 * @param {String} password - The password to check
 * @param {Boolean} shouldCheck - Should check the option
 *
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */
const calculateTimeBetween = ({ end, start }) => {
  // Get total seconds between the times
  let delta = Math.abs(end - start) / 1000;

  // Calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // Calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // Calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // Remaining time in seconds
  const seconds = Math.round(delta % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
