import { BackgroundCanvasElement } from "./components/BackgroundCanvasComponent";
import { Button } from "./components/Button";
import { CanvasElement } from "./components/CanvasElement";

function App() {
  return (
    <>
      <div>
        <Button />
        <BackgroundCanvasElement />
        <CanvasElement />
      </div>
    </>
  );
}

export default App;
