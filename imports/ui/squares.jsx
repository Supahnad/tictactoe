import React from "react";

function Squares(props){
  const style = props.x ? 'x' : (props.o ? 'o' : '');
  const classes = `square ${style}`
  return (
     <div className={classes} {...props} >{props.x ? 'x' : (props.o ? 'o' : '')}</div>
  );
};

export default Squares;