import { useAppDispatch } from "../slices";
import { onRandomGates } from "../slices/graphSlice";
import classes from "./Canvas.module.scss";
const RANDOM_GENERATE = "Сгеренировать случайно";

export const Button = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(onRandomGates());
  };
  return (
    <>
      <button className={classes.button} onClick={onClick}>
        {RANDOM_GENERATE}
      </button>
    </>
  );
};
