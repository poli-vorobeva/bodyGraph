import { useAppDispatch } from "./slices";
import { onRandomGates } from "./slices/graphSlice";

const RANDOM_GENERATE = "Сгеренировать случайно";

export const Button = () => {
  console.log("BUTTON");
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(onRandomGates());
  };
  return (
    <>
      <button onClick={onClick}>{RANDOM_GENERATE}</button>;<div></div>
    </>
  );
};
