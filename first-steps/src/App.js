import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  let size = 1;
  let circles = []
  let asdf = []


  p5.setup = () => p5.createCanvas(600, 400);


  p5.updateWithProps = props => {
    console.log("updateProps")
    if (props.size) {
      size = props.size;
    }
    if (props.circles) {
      circles = props.circles;
    }
    if (props.asdf) {
      console.log(props.asdf)
      asdf = props.asdf
    }
  };

  p5.draw = () => {
    p5.background(255)
    if (circles) {
      circles.forEach((circle, index) => {
        p5.circle(circle.x, circle.y, size)
      })
    }
    
    if (asdf) {
      asdf.forEach((asd, index) => {
        p5.rect(asd.x, asd.y, size, size)
      })
    }
  };

}


export default function App() {
  const [state, setState] = React.useState({
    size: 10,
    circles: [{x: 50, y:50}],
    asdf: [{"name": "A", x: 200, y:200}, {"name": "B", x: 400, y: 200}]
  });

  const increaseSize = React.useCallback(() => {
    setState(state => ({ ...state, size: state.size + 1 }));
  }, []);

  const [frameTime, setFrameTime] = React.useState(0);
  React.useEffect(() => {
    let frameId
    const frame = time => {
      setFrameTime(time)
      let newCircles = []
      state.circles.forEach((elm) => {
        if(elm.x <= state.asdf[1].x) {
          newCircles.push({x: elm.x +1, y: elm.y });
        }
      })
      setState(state => ({ ...state, circles: newCircles }))
      frameId = requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
    return () => cancelAnimationFrame(frameId)

  },[state.circles, state.asdf])

  const addCircle = React.useCallback(() => {
    let newCircles = state.circles;
    newCircles.push({x: state.asdf[0].x + state.size/2, y: state.asdf[0].y + state.size/2});
    setState(state => ({ ...state, circles: newCircles }));
  }, [state.circles, state.asdf]);

  return <React.Fragment>
     <ReactP5Wrapper sketch={sketch} size={state.size} circles={state.circles} asdf={state.asdf} /> 
      <button onClick={increaseSize}>Inc</button>
      <button onClick={addCircle}>Add</button>
      {state.circles.length}
    </React.Fragment>
  
}