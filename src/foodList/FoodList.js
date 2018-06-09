import React, {Component} from 'react';
import './FoodList.css'

export default class FoodList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            foodArray: [],
            category: [],
            order: [],
            netSum: 0
        }
    }

    componentDidMount() {
        fetch('https://thesmartq.firebaseio.com/menu.json').then(res => res.json()).then(res => {
            let categories = [];
            res.forEach((item) => {
                item.addedValue = 0;
                if (categories.indexOf(item.category) == -1) {
                    categories.push(item.category);
                }
            })
            this.setState({
                result: res,
                foodArray: res,
                category: categories
            })
        })
    }

    itemSelect(item) {
        // console.log(item);
        let list = document.getElementById('category').getElementsByTagName('li');
        list[0].classList.remove('active');
        for (let i = 0; i < list.length; i++) {
            if (list[i].innerText == item.category) {
                list[i].classList.add('active');
            } else {
                list[i].classList.remove('active');
            }
        }
    }

    categorySelect(items) {

        let foodArray = [];
        if (items !== 'All') {
            this.state.result.map(item => {
                if (item.category == items) {
                    foodArray.push(item);
                }
            })
        } else {
            foodArray = this.state.result;
        }
        //console.log(items);
        let list = document.getElementById('category').getElementsByTagName('li');
        for (let i = 0; i < list.length; i++) {
            if (list[i].innerText == items) {
                list[i].classList.add('active');
            } else {
                list[i].classList.remove('active');
            }
        }
        this.setState({
            foodArray
        })
    }

    checkOrderList(index, oldarray) {
        let totalSum = 0;
        let order = this.state.order;

        if (order.length !== 0) {
            let unique = true;
            for (let i = 0; i < order.length; i++) {
                if (order[i]['item'] == oldarray['name']) {
                    console.log('repeated')
                    order[i]['qty'] = oldarray.addedValue;
                    order[i]['price'] = oldarray.price * oldarray.addedValue
                    unique = false;
                }
            }
            if (unique) {
                //console.log(order[i]['item'] + oldarray['name']);
                console.log('not repeated')
                order.push({
                    item: oldarray['name'],
                    qty: oldarray.addedValue,
                    price: oldarray.price * oldarray.addedValue
                })
            }

        } else {
            console.log('C');
            order.push({
                item: oldarray['name'],
                qty: oldarray.addedValue,
                price: oldarray.price * oldarray.addedValue
            })
        }

        order.forEach(item => {
            totalSum = totalSum + item.price
        })
        this.setState({
            order,
            netSum: totalSum
        })
    }

    addItems(index, item) {

        let oldarray = this.state.foodArray;
        oldarray[index].addedValue = oldarray[index].addedValue + 1;
        this.checkOrderList(index, item);

    }
    componentWillMount(){
        console.log(document.getElementById('addAnimation'))
    }

    subtractItems(index) {
        let totalSum = this.state.netSum;
        let order = this.state.order;
        let oldarray = this.state.foodArray;
        for (let i = 0; i < order.length; i++) {
            if (order[i]['item'] == oldarray[index]['name']) {
                oldarray[index].addedValue = oldarray[index].addedValue - 1;
                console.log('repeated')
                if (oldarray[index].addedValue == 0) {
                    document.getElementById('addAnimation').className='removeItem'
                    console.log(document.getElementById('addAnimation'))
                    order.splice(i, 1);
                    totalSum = this.state.netSum - oldarray[index].price;
                } else {
                    order[i]['qty'] = oldarray[index].addedValue;
                    order[i]['price'] = oldarray[index].price * oldarray[index].addedValue;
                    totalSum = this.state.netSum - oldarray[index].price;
                }

            } else {
                console.log('do nothing');
            }
        }
        setTimeout(this.setState({
            orders: order,
            netSum: totalSum
        }),0)

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <div className="card-box">
                            <ul className="list-group" id="category">
                                <li className="list-group-item active"
                                    onClick={this.categorySelect.bind(this, 'All')}>All
                                </li>
                                {this.state.category.map((item) => {
                                    return (
                                        <li className="list-group-item"
                                            onClick={this.categorySelect.bind(this, item)}><p>{item}</p>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="card-box">
                            {this.state.foodArray.map((item, index) => {
                                return (
                                    <div className="card-box individualCard">
                                    <div className="row" key={index} onClick={this.itemSelect.bind(this, item)}>

                                            <div className="col-sm-9">
                                                <div className="card-body">
                                                    <p>{item.name}</p>
                                                    <p id="itemDescription">{item.description}</p>
                                                    <p>${item.price}</p>
                                                </div>
                                                <hr/>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="row addSubtract">
                                                    <div className="col-sm-1">
                                                        <button className="btn btn-primary "
                                                                onClick={this.addItems.bind(this, index, item)}>+
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-1">
                                                        <p className="value">{item.addedValue}</p>
                                                    </div>
                                                    <div className="col-sm-1">
                                                        <button className="btn btn-primary Subtract"
                                                                onClick={this.subtractItems.bind(this, index)
                                                                }>-
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}

                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card-box">
                            {this.state.order.map(item => {
                                return (
                                    <p id="addAnimation" className="addItem">
                                        {item.item + ' X ' + item.qty + ' = ' + item.price}
                                    </p>
                                )
                            })}
                            <div className="total">
                                <h4> TOTAL : <span>{this.state.netSum}</span></h4>
                            </div>

                            <div className="checkout">
                                <button className="btn btn-warning">Checkout</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}