import React from "react";

function Squares(props){
  return (
     <div className="square" {...props} >{props.x ? 'x' : (props.o ? 'o' : '')}</div>
  );
};

export default Squares;