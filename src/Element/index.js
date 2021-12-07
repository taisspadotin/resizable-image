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
            lastY: 0
        }
    }

    componentDidMount(){
        const p = document.getElementById("div1");
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

    handleDrag(e){
        let { height, lastY } = this.state;
        //console.log('e',e);
        console.log("e.clientY > lastY", e.clientY > lastY)
        if(e.clientY !== lastY){
            this.setState({height: e.clientY > lastY ? (height + 1) : (height - 1), lastY: e.clientY})
        }
    }

    handleDragStart = async (e) =>{
        e.dataTransfer.setData("text/plain", "");
        var img = await new Image();
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    render(){
        let { height, lastY } = this.state;
        return(
            <div style={{position: 'relative'}}>
                <div id="div1"
                draggable={true}
                onDragStart={()=>console.log("teste")}
                onDragEnd={()=>console.log("teste leave")}
                style={{width: '100%', height: '10px', background: '#000', position: 'absolute', top: 0, cursor: 's-resize'}}></div>
                <div style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, right: 0, cursor: 'e-resize'}}></div>
                <div style={{height: '100%', width: '10px', background: '#000', position: 'absolute', top: 0, left: 0, cursor: 'e-resize'}}></div>
                <div
                draggable={true}
                onDragStart={(e)=> this.handleDragStart(e)}
                onDrag={(e)=> this.handleDrag(e)}
                onDragEnd={(e)=>console.log("teste leave", e)}
                style={{width: '100%', height: '10px', background: '#000', position: 'absolute',  bottom: 0, cursor: 's-resize'}}></div>
                <div style={{width: this.state.width, height: this.state.height}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}