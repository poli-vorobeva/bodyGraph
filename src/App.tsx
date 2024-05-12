import { BackgroundCanvasElement } from "./components/BackgroundCanvasComponent";
import { Button } from "./components/Button";
import { CanvasElement } from "./components/CanvasElement";
import classes from "./App.module.scss";
function App() {
  return (
    <>
      <div className={classes.container}>
        <BackgroundCanvasElement />
        <CanvasElement />
        <Button />
      </div>
    </>
  );
}

export default App;
