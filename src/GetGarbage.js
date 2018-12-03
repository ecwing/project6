import React, {Component} from 'react';
import axios from 'axios';


class Api extends Component {
    constructor() {
        super()
        this.state = {
            returnInfo: []
        }
    }
    componentDidMount() {
        this.getGarbage();
    }

    getGarbage = () => {
        axios.get(" https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", {
            // params: {
            //     keywords: []
            // }
        })
        .then(res => {
            console.log('show us data', res)
            this.setState({
                returnInfo: res
            })
        })
    }
    render() {
        return (
            <div>
                <p>testing</p>
            </div>
        )
    }


}
export default Api;