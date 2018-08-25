function isHidden(Div,Show_and_Hide_Button){
  var vDiv = document.getElementsByName(Div);
  var i;
  for (i = 0; i < vDiv.length; i ++ ){
  vDiv[i].style.display = (vDiv[i].style.display == 'none')?'block':'none';
  }

  var Show_and_Hide_Button_Elements = document.getElementById(Show_and_Hide_Button);


// Show_and_Hide_Button_Elements.innerHTML = "&uarr;&uarr;HIDE&uarr;&uarr;";
  // Show_and_Hide_Button_Elements.value = '100';
  if (Show_and_Hide_Button_Elements.innerHTML.indexOf('MORE') != -1){
  Show_and_Hide_Button_Elements.innerHTML = "&uarr;&uarr;HIDE&uarr;&uarr;";
  Show_and_Hide_Button_Elements.style.borderTop = "none";
  Show_and_Hide_Button_Elements.style.borderBottom = "0.5px dashed";
  Show_and_Hide_Button_Elements.style.borderBottom.width = "thin";
  Show_and_Hide_Button_Elements.style.fontStyle = "Italic";
  Show_and_Hide_Button_Elements.marginTop = "10px";
  Show_and_Hide_Button_Elements.style.textAlign = "left";

  }


  // Show_and_Hide_Button_Elements.style.color = "blue";

  else

  {Show_and_Hide_Button_Elements.innerHTML = "&darr;&darr;MORE&darr;&darr;";

  Show_and_Hide_Button_Elements.style.borderTop = "0.5px dashed";
  Show_and_Hide_Button_Elements.style.borderTop.width = "thin";
  Show_and_Hide_Button_Elements.style.borderBottom = "none";
  Show_and_Hide_Button_Elements.marginTop = "25px";
  Show_and_Hide_Button_Elements.style.fontStyle = "Italic";
  Show_and_Hide_Button_Elements.style.textAlign = "right";
  // Show_and_Hide_Button_Elements.style.fontSize = "17px";

  }

  console.log( "handler1" );


}


// function gnid(Div){
 //  var vDiv = document.getElementsByName(Div);
//   vDiv.style.background = #032321;
//
// }
