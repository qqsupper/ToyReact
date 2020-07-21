import {TonyReact, Component} from './TonyReact';

class MyComponent extends Component{
    render(){
      return(
       <div>
        <span>hello</span>
        <span>work</span>
        <div>
           {true}
           {this.children}
        </div>
       </div>
      )
    }
}


let a=<MyComponent name="a" id='ida'>
    <div>123</div>
    <div>456</div>
     <div>555</div>
</MyComponent>;


TonyReact.render(a,document.body)