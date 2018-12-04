import React, { Component } from 'react';
import axios from 'axios';


class Api extends Component {
  constructor() {
    super()
    this.state = {
      returnInfo: [],
      search: "",
      user: null,
      keywords: "",
      category: "",
      body: "",
      title: "",
    }
  }
  componentDidMount() {

  }

  getGarbage = () => {
    axios.get(" https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", {
      params: {
        description: this.state.keyword,
      },
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        const searchRes = res.data.filter(item => {
          return item.keywords.includes(this.state.search)
        })
        console.log(searchRes);
        this.setState({
          returnInfo: searchRes
        })
      });

  }


  handleSearch = (e) => {

    this.setState({
      [e.target.id]: e.target.value
    })
  
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getGarbage();
  }

 decodeHtml = (query) => {
  const text = document.createElement();
  text.innerHTML = query;
  return text.value;
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
          <input type="submit" value="Garbage Day"/>
        </form>
        
        {this.state.returnInfo.map(result => {
          return (
            <div className="searchResults">
              <h2>{result.title}</h2>
              <p>{this.decodeHtml(result.body)}</p>
            </div>
          )
        })
          
        }

       
      </div>
    )
  }

}
export default Api;