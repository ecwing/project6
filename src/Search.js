// user types in a word into the search bar -- this is stored in state as "search" done
// look for the presence of that word in the "keywords" of all the objects -- this is done and the matching object(s) are stored in state in an array called "returnInfo"
// map through all the returnInfo objects and find the exact match, store that in "finalSearch"
// then, take the index of the object that contains that searchWord 
// then, display the search word as the title
//display the category as an image (blue bin, green etc)
//display the body of the object as the content.  

//map thorugh all the objects an

//super string --> array --> set --> list of searchable keywords --> then send that back as the API call --> then the single object ** do this one bc if the person wants to do another search, they CAN . otherwise they will have to hard reload the page  ** error handling will be easier on this. 
//pre-loader f

// option one is that we don't care 
// option two is that we offer a list of suggestions 
// on componentDidmount, take all the keywords and run a method to turn a string of comma separated values into an array 
// then take a all the strings of all the key words, and then we make one giant array 
// remove duplicates -- a "set" doesn't allow repeats 
// show the user all 4 
// or -- load the page and concatenate a mega list of key words 
// and then create a searchable drop-down and auto-complete for a specific keyword
// user chooses whcih they want and then we can search it 
// OR run a search, and grab a list of keywords and "did you mean"
// auto complete -- recommend that we include a modal that shows them EVERYTHING  
// easter eggs ~~~ 




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
    })
      .then(res => {
        const superArray = res.data.map(item => {
          return item.keywords;
        })
        const superString = superArray.toString(); //superString is a single string of comman separated values. 

        const allTheKeyWords = superString.split(','); //makes a new array 
        
        const allTheKeyWords2 = allTheKeyWords.map(item => { // allTheKeyWords2 is an array of keywords
          return item.trimStart();
        })

        console.log(allTheKeyWords2);

        const superSet1 = new Set(allTheKeyWords2) //turns it into a set and removes duplicates
        console.log(superSet1);

   

        const searchRes = res.data.filter(item => {
          return item.keywords.includes(this.state.search)
        })
        // console.log(searchRes);
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

<<<<<<< HEAD
 decodeHtml = (query) => {
  const text = document.createElement();
  text.innerHTML = query;
  return text.value;
}
=======
  decodeHtml = (query) => {
    const text = document.createElement("textarea");
    return text.innerHTML = query;
  }

>>>>>>> 4ca2369435533e9c4d802fbf0b8652aa634f63a6

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
<<<<<<< HEAD
              <p>{this.decodeHtml(result.body)}</p>
=======
              <p>{this.decodeHtml(`${result.body}`)}</p>
>>>>>>> 4ca2369435533e9c4d802fbf0b8652aa634f63a6
            </div>
          )
        })
          
        }

       
      </div>
    )
  }

}
export default Api;