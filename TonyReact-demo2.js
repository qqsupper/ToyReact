
class ElementWrapper{ //设置元素节点
   constructor(type){
     this.root=document.createElement(type)  //创建dom节点元素
   }
   setAttribute(name,value){
      if(name.match(/^on([\s\S]+)$/)){
         // console.log(RegExp.$1)
            let event = RegExp.$1.replace(/\s\S/, s => s.toLowerCase())
            this.root.addEventListener(event, value);
      }

      if(name==='className'){
         this.root.setAttribute('class',value)
      }
   
      this.root.setAttribute(name,value)  //设置节点属性
   }
   appendChild(range){
      let range=document.createRange()
      if(this.root.children.length){
         range.setStartAfter(this.root.lastChild)
         range.setEndAfter(this.root.lastChild)
      }else{
         range.setStart(this.root,0)
         range.setEnd(this.root, 0)
      }
      vchild.mountTo(range) //将虚拟子节点挂载到节点上
   }
   mountTo(range){
         range.deleteContents();
         range.insertNode(this.root)
   }
}

class TextWrapper{ //设置文本节点
  constructor(content){
   this.root=document.createTextNode(content) //创建文本节点
  }

  mountTo(range){
      range.deleteContents()
      range.insertNode(this.root)
  }
}

export class Component{
 
   constructor(){
    this.children=[]
    this.props=Object.create(null)
   }
     //组件方法
   setAttribute(name,value){
      if(name.match(/^on([\s\S]+)/)){
         console.log(RegExp.$1)

      }
     this.props[name]=value
     this[name]=value  
   }
   mountTo(range){
      this.range=range
      this.update()
   }
   update(){
         //创建一个placeholder占位 不让下面节点移动上来
         let placeholder=document.createElement('placeholder')
         let range=document.createRange()
         range.setStart(this.range.endContainer,this.range.endOffset)
         range.setEnd(this.range.endContainer,this.range.endOffset)
         range.insertNode(placeholder)

         this.range.deleteContents(); //清除range内容

         let vdom=this.render()
         vdom.mountTo(this.range)

         //placeholder.parentNode.removeChild(placeholder)
   }
   appendChild(vchild){
    this.children.push(vchild)
   }
   setState(state){
      //更新状态
       let merge=(oldState,newState)=>{
            for(let p in newState){
                if(typeof newState[p]==='object'){
                    if(typeof oldState[p] !=='object'){
                       oldState[p]={}
                    }
                    merge(oldState[p],newState[p]) //如果是对象是循环递归里面key
                }else{
                    oldState[p]=newState[p]
                }
            }
       }
       if(!this.state&&state){
          this.state={}
       }
       merge(this.state,state);
       this.update();

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
      let range=document.createRange()
      if(element.children.length){
         range.setStartAfter(element.lastChild)
         range.setEndAfter(element.lastChild)
      }else{
         range.setStart(element,0)
         range.setEnd(element,0)
      }

      vdom.mountTo(range)
 }
}