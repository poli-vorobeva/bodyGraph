import { useThrottle } from "../hooks/useThrottle";
import { useAppDispatch } from "../slices";
import { onRandomGates } from "../slices/graphSlice";
import classes from "./Canvas.module.scss";

const RANDOM_GENERATE = "Сгенерировать";

export const Button = () => {
  const dispatch = useAppDispatch();

  const onClickThrottle = useThrottle(() => {
    dispatch(onRandomGates());
  }, 500);

  return (
    <>
      <button className={classes.button} onClick={onClickThrottle}>
        {RANDOM_GENERATE}
      </button>
    </>
  );
};
