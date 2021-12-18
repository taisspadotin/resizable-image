import React from 'react';

export default class Element extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startWidth: 0,
            startHeight: 0,
            startX: 0,
            startY: 0,
            height: 100,
            width: 100,
            lastY: 0,
            top: 50
        }
    }

    componentDidMount(){
        //const p = document.getElementById("div1");
        /*p.className = p.className + ' resizable';
        var resizer = document.createElement('div');
        resizer.className = 'resizer';
        p.appendChild(resizer);*/
        //p.addEventListener('mousedown', this.initDrag, false);
    }

    initDrag(e) {
        const p = document.getElementById("div1");
        let { startX, startY, startWidth, startHeight } = this.state;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
        this.setState({
            startX, startY, startWidth, startHeight 
        }, () => {
            document.documentElement.addEventListener('mousemove', this.doDrag, false);
            document.documentElement.addEventListener('mouseup', this.stopDrag, false);    
        })
     }
     
      doDrag(e) {
        let { startX, startY, startWidth, startHeight } = this.state;
        const p = document.getElementById("div1");
        p.style.width = (startWidth + e.clientX - startX) + 'px';
        p.style.height = (startHeight + e.clientY - startY) + 'px';
     }
     
      stopDrag(e) {
         document.documentElement.removeEventListener('mousemove', this.doDrag, false);    
         document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
     }

    handleDrag(op, e){
        let soma = 1;
        let sub = -1;
        let { height, lastY, top } = this.state;
        
        console.log("e.clientY > lastY", e.clientY, lastY)

        if(op === "bottom"){
            if(lastY !== 0 && e.clientY !== 0){
                soma = e.clientY - lastY;
                sub = e.clientY - lastY;
            }
            if(e.clientY !== lastY){
                this.setState({height: e.clientY > lastY ? (height + soma) : (height + sub), lastY: e.clientY})
            }
        }
        else if(op === "rigth"){

        }
        else if(op === "top"){
            if(lastY !== 0 && e.clientY !== 0){
                soma = lastY - e.clientY;
                sub = e.clientY - lastY;
            }
            console.log("soma", soma)
console.log("sub", sub)
            if(e.clientY !== lastY && top !== 0){
                console.log("(height + soma)", (height + soma))
                console.log("(height + sub)", (height + sub))
                console.log("e.clientY < lastY", e.clientY < lastY)
                this.setState({
                    height: e.clientY < lastY ? (height + soma) : (height + sub),
                    top: e.clientY < lastY ? (top - soma) : (top + sub),
                    lastY: e.clientY})
                    
            }
        }
        else if(op === "left"){

        }
    }

    handleDragStart = async (e) =>{
        e.dataTransfer.setData("text/plain", "");
        var img = await new Image();
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    render(){
        let { top } = this.state;
        return(
            <div style={{position: 'absolute', background: 'green', width: this.state.width, height: this.state.height, top: top}}>
            <div style={{position: 'relative', width: this.state.width, height: this.state.height}}>
                
                    <div id="div1"
                        draggable={true}
                        onDragStart={(e)=> this.handleDragStart(e)}
                        onDrag={(e)=> this.handleDrag("top",e)}
                        style={{width: '100%', height: '10px', background: '#000', position: 'absolute', top: 0, cursor: 's-resize'}}></div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> this.handleDragStart(e)}
                        onDrag={(e)=> this.handleDrag("rigth",e)}
                        style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, right: 0, cursor: 'e-resize'}}></div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> this.handleDragStart(e)}
                        onDrag={(e)=> this.handleDrag("left",e)}
                        style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, left: 0, cursor: 'e-resize'}}></div>
                    <div
                        draggable={true}
                        onDragStart={(e)=> this.handleDragStart(e)}
                        onDrag={(e)=> this.handleDrag("bottom",e)}
                        style={{width: '100%', height: '10px', background: '#000', position: 'absolute',  bottom: 0, cursor: 's-resize'}}></div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}