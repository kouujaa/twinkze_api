var counter = 1000020;

const provideId = () => {
  const newcount = counter;
  coumter++;
  return newcount;
};

module.exports = provideId;
