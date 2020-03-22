import React from 'react';
import API from "../utils/api.js";
import styles from './app.module.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            RUB: 0,
            USD: 0,
            currencyHistory: []
        };



        this.updateCurrency = this.updateCurrency.bind(this);
    }

    updateCurrency() {
        try {
            let currencyData = API.get('/');
            currencyData.then((data) => {
                if (data.status == 200) {
                    let tmpCurrencyHistory = [...this.state.currencyHistory];
                    tmpCurrencyHistory.push({
                        RUB: data.data.rates.RUB,
                        USD: data.data.rates.USD,
                        date: data.data.date
                    });
                    this.setState({
                        RUB: data.data.rates.RUB,
                        USD: data.data.rates.USD,
                        currencyHistory: tmpCurrencyHistory
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        try {
            this.updateCurrency()
            setInterval(() => this.updateCurrency(), 1000);
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        // console.log(this.state.currencyHistory);
        let currencyLogHistory = this.state.currencyHistory.map((item, index) => {
            return (
                <div key={index}>
                    <div>
                        <span>Rubles</span> : <span>{item.RUB}</span>
                    </div>
                    <div>
                        <span>Dollars</span> : <span>{item.USD}</span>
                    </div>
                    <div>
                        <span>Date</span> : <span>{item.date}</span>
                    </div>
                    <hr/>
                </div>
            )
        });
        
        return ( 
            <div>
                <h2>Котировки за 1 EUR</h2>
                <div>
                    <span>Rubles</span> : <span>{this.state.RUB}</span>
                </div>
                <div>
                    <span>Dollars</span> : <span>{this.state.USD}</span>
                </div>
                <h3>
                    History
                </h3>
                <div className={styles.historyBlock}>
                    {currencyLogHistory}
                </div>
            </div>
        );
    }
}

export default App;