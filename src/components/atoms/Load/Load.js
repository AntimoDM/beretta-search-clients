import React from "react";

const Load = ({ text }) => {
  /*  
   Loader con gif
   return (
      <div style={{zIndex:'999999'}} className="loader_outer h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="loader_div_container">
        <img src={'/media/mohd_loading.gif'}/>
       </div>
      </div>
    )
  */
  return (
    <div
      style={{ zIndex: "999999" }}
      className="loader_outer h-100 w-100 d-flex justify-content-center align-items-center"
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Load;
