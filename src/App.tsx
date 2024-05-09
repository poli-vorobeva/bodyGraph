import styles from "./App.module.scss";
import { CanvasElement } from "./CanvasElement";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <CanvasElement />
      </div>

      {/*   <div className={styles.test}>
        <div className={styles.top}>1</div>
        <div className={styles.bottom}>
          <div>2</div>
          <div className={styles.bottomChild}>3</div>
        </div>
      </div> */}
    </>
  );
}

export default App;
