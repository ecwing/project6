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
              return item.keywords.includes(this.state.search)
            })
          console.log(newConstok);
            });

            this.setState({
                // returnInfo: res.data
            })
        }
    

    handleSearch = (e) => {
        
        this.setState({
          [e.target.id]: e.target.value
          })
        console.log('test', this.state.search)
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.getGarbage();
    }



    render() {
        // let searchInfo = this.returnInfo
        // searchInfo = searchInfo.filter((info) => {
        //     return info[1].keyword.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        // })
        return (
            <div>
                <p>testing</p>
                  <form onSubmit={this.handleSubmit}>
                  <input type="text"
                      id="search"
                      value={this.state.search}
                      onChange={this.handleSearch} />
                </form>
            </div>
        )
    }

}
export default Api;