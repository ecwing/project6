import React, {Component} from 'react';
import axios from 'axios';


class Api extends Component {
    constructor() {
        super()
        this.state = {
            returnInfo: [],
            search: "",
            user: null, 
        }
    }
    componentDidMount() {
        this.getGarbage();
    }

    getGarbage = () => {
        axios.get(" https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", {
            params: {
                description: this.state.keyword
            }
        })
        .then(res => {            
            const newConstok = res.data.filter(item => {
              return item.keywords.includes("cup")
            })
          console.log(newConstok);
            // console.log('show us data', res.data)
            const newArray = res.data.map((item) => {
              let keyWords = item.keywords 
              let category = item.category
              let title = item.title
              let body = item.body 
            });

            this.setState({
                returnInfo: res.data
            })
        })
    }

    updateSearch = (e) => {
        this.setState({
            search: e.target.value
        })
        console.log('test', this.state.search)
    }



    render() {
        // let searchInfo = this.returnInfo
        // searchInfo = searchInfo.filter((info) => {
        //     return info[1].keyword.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        // })
        return (
            <div>
                <p>testing</p>
                <input type="text"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)} />
            </div>
        )
    }

}
export default Api;