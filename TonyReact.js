
class ElementWrapper{ //设置元素节点
   constructor(type){
     this.root=document.createElement(type)  //创建dom节点元素
   }
   setAttribute(name,value){
      this.root.setAttribute(name,value)  //设置节点属性
   }
   appendChild(vchild){
      vchild.mountTo(this.root) //将虚拟子节点挂载到节点上
   }
   mountTo(parent){
      parent.appendChild(this.root) //将节点挂载到父节点上
   }
}

class TextWrapper{ //设置文本节点
  constructor(content){
   this.root=document.createTextNode(content) //创建文本节点
  }

  mountTo(parent){
   parent.appendChild(this.root) //将文本节点挂载到父节点上
  }
}

export class Component{
 
   constructor(){
    this.children=[]
   }
     //组件方法
   setAttribute(name,value){
     this[name]=value  
   }
   mountTo(parent){
      let vdom=this.render()  //TonyReact.render->Comonment
      vdom.mountTo(parent)  
   }
   appendChild(vchild){
    console.log(333)
    this.children.push(vchild)
   }
}



export let TonyReact={
 createElement(type,attributes,...children){
   //组件和原生节点
  console.log(arguments)
      let element;
      if(typeof type==='string')
         element=new ElementWrapper(type); //渲染原生节点
      else 
        element=new type; //渲染组件节点
    for (let name in attributes){
     element.setAttribute(name, attributes[name]);
  }

  // 处理子节点
  let insertChildren=(children)=>{
   
    for (let child of children) {
     if (typeof child ==='object'&&child instanceof Array) {
         insertChildren(child) //如果是数组递归调用子节点
     }else{
        if(!(child instanceof Component)&&
           !(child instanceof ElementWrapper)&&
           !(child instanceof TextWrapper)  //判断不是组件和元素,文本类
        ){
           child=String(child)
        }
        if(typeof child==='string'){
           child=new TextWrapper(child)
        }
        
        element.appendChild(child)
     }
   }
  }
  insertChildren(children)
   return element
 },
 render(vdom, element) {
  console.log(111,vdom)
   // vdom是a,element是body
   vdom.mountTo(element)
 }
}