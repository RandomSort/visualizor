import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  let size = 1;
  let circles = []


  p5.setup = () => p5.createCanvas(600, 400);


  p5.updateWithProps = props => {
    if (props.size) {
      size = props.size;
    }
    if (props.circles) {
      circles = props.circles;
    }
  };

  p5.draw = () => {
    if (circles) {
      circles.forEach((circle, index) => {
        p5.circle(circle.x, circle.y, size)
      })
    }
    
    [{x: 500, y:300}].forEach((circle, index) => {
      p5.circle(circle.x, circle.y, size)
    })
    p5.circle(300,200, size)
  };

}


export default function App() {
  const [state, setState] = React.useState({
    size: 10,
    circles: [{x: 50, y:50}],
  });

  const increaseSize = React.useCallback(() => {
    setState(state => ({ ...state, size: state.size + 1 }));
  }, []);

  const [frameTime, setFrameTime] = React.useState(0);
  React.useEffect(() => {
    let frameId
    const frame = time => {
      setFrameTime(time)
      frameId = requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
    return () => cancelAnimationFrame(frameId)

  },[])

  const addCircle = React.useCallback(() => {
    let newCircles = state.circles;
    newCircles.push({x: 10, y: 10});
    setState(state => ({ ...state, circles: newCircles }));
  }, [state.circles]);

  return <React.Fragment>
     <ReactP5Wrapper sketch={sketch} size={state.size} circles={state.circles} /> 
      <button onClick={increaseSize}>Inc</button>
      <button onClick={addCircle}>Add</button>
      {frameTime}
    </React.Fragment>
  
}