import React,{Component} from 'react';

export default class AddingCart extends Component{
    constructor(props){
        super(props);
        this.state={
            orders:[]
        }
    }
    componentWillReceiveProps(nextProp){
        let order=this.state.orders.slice();
        console.log(nextProp)
        if(!this.state.orders.length){
            order.push({name:nextProp.name,qty:nextProp.qty,price: nextProp.price})
            console.log('C '+ this.state.orders)
            this.setState({
                orders:order
            })
        }
        this.state.orders.forEach((item,index)=>{
            if(item.name!==nextProp.name){
                order.push({name:nextProp.name,qty:nextProp.qty,price: nextProp.price})
                console.log('A '+ this.state.orders)
                this.setState({
                    orders:this.state.orders.push(order)
                })
            }else{
                order.push({name:nextProp.name,qty:nextProp.qty,price: nextProp.price})
                console.log('B '+ this.state.orders)
                this.setState({
                    orders:this.state.orders.splice(index,1,order)
                })
            }

        })

    }
    render(){
        return(<div>
            <p>rgfscd</p>
            {/*{this.state.orders.forEach(item => {*/}
                {/*return (*/}
                    {/*<p>*/}
                        {/*{item.name + ' X ' + item.qty + ' = ' + item.price}*/}
                    {/*</p>*/}
                {/*)*/}
            {/*})}*/}
        </div>)
    }
}