// -------- Convert Time ------------- ////
const convertFirebaseTime = (time: {
  seconds: number,
  nanoseconds: number,
}) => {
  console.log('convert, seconds,nanoseconds :>> ', time);
  const fireBaseTime = new Date(
    time.seconds * 1000 + time.nanoseconds / 1000000
  );

  const date = fireBaseTime.toLocaleDateString();
  const atTime = fireBaseTime.toLocaleTimeString();
  const dateAndTime = { date, atTime };
  return dateAndTime;
};
export {convertFirebaseTime}