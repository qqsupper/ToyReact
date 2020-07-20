

export let TonyReact={
 createElement(type,attributes,...children){
  console.log(arguments)

  let element=document.createElement(type);

  for (let name in attributes){
     element.setAttribute(name, attributes[name]);
  }

  for(let child in children){
   if(typeof child =='string'){
    child=document.createTextNode(child)
   }

   element.appendChild(item)
  }
   return element
 },
 render(vdom, element) {
   element.appendChild(vdom)
 }
}