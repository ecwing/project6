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
import Downshift from 'downshift'
// import { create } from 'domain';

let items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
]


class Api extends Component {
  constructor() {
    super()
    this.state = {
      keywordList: [],
      APIdata: [],
      searchInput: "",
      submitSearch: []
    }
  }
  componentDidMount() {
    console.log("test")
    this.getKeywordList()
  }

  filteredSearch = (item) => {
    // Code block below converts the keywords property to an array with each index as a keyword - this code block WORKS
    const mappedKeywords = this.state.APIdata.map(item => {
      item.keywords = item.keywords.split(',').map(word => word.trim());
      return item;
    });
    console.log(mappedKeywords)

    //trying to map over new said array to try and extract entire object from said keyword
    const matchedKeyword = mappedKeywords.filter(item => {
      
      return item.keywords.includes(this.state.searchInput)
    })
    console.log(matchedKeyword)
  }
  

  //function that MAKES call from API and creates an array of strings that have no repeats and no spaces
  getKeywordList = () => {
    axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000", )
      .then(res => {

        //on then, map through each result, and return the strings inside each (keyword: "") and make an array of them
        const apiReturn = res.data;
        const keywordArray = res.data.map(item => {
          return item.keywords;
        })
        
        
        //turn the keywordArray into a giant string of comma seperated values
        const superString = keywordArray.toString(); //superString is a single string of comman separated values. 
        
        
        //makes a new Array, by seperating the superstring at ever 'comma', each individually split word becomes an index in the array 
        const keywordArraySeparated = superString.split(','); 
        
        //making a new Array that has removed the blank space off of the returned strings that had an empty spae
        const allTheKeyWords2 = keywordArraySeparated.map(item => { 
          return item.trimStart();
        })
        
        //turning Array of trimmed keywords into a SET to remove all duplicate strings
        const superSet1 = new Set(allTheKeyWords2)
        let cleanArray = Array.from(superSet1) 
          
        //take each index in our Array and turn it into an individual object that has a specified KEY that we decide. For each
        
        let cleanArray2 = cleanArray.map(item => {
            return {
              name: item
            };
        });

        //turning SET back into an Array and setting state with it
        this.setState({
          APIdata: apiReturn,
          keywordList: cleanArray2
        })
      });
    }

    // const searchRes = res.data.filter(item => {
    //   return item.keywords.includes(this.state.search)
    // })
    // // console.log(searchRes);
    // this.setState({
    //   returnInfo: searchRes
    // })


  handleSearch = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const userSearch = this.state.APIdata.filter(item => {
      return item.keywords.includes(this.state.searchInput.toLowerCase())
    })
    
    // console.log(userSearch);
    this.setState({
      submitSearch: userSearch
    })
    this.filteredSearch(this.state.userInput)
  }

  decodeHtml = (query) => {
    const text = document.createElement("textarea");
    text.innerHTML = query
    let regex1 = text.value.replace(/<(.|\n)*?>/g, '')
    let regex2 = regex1.replace(/(&ldquo;(?!\s*&ldquo;).*?)&rdquo;/)
    let CLEANSTRING = regex2.replace(/&nbsp;/g, ' ')
    return CLEANSTRING
  }

  //function that turns keywords into array of seperate keywords\
  //NEEDS WORK
  splitString = (keyword) => {
    let answers = [];
    let userKeyword = keyword
    let solution = keyword.split(',');
    let match = solution.map(each => {
      if (each == userKeyword) {
        answers.push(keyword) 
      }});
    console.log(answers)
  };
  ////////////////////////////////////////



  render() {
    return (
      <div>
        <p>testing</p>
        {/* <form onSubmit={this.handleSubmit}>
          <input type="text"
            id="searchInput"
            value={this.state.searchInput}
            onChange={this.handleSearch} />
          <input type="submit" value="Garbage Day"/>
        </form> */}
      
        <Downshift
          onChange={selection => alert(`You selected ${selection.name}`)}
          itemToString={item => (item ? item.name : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
              <div>
                <label {...getLabelProps()}>Find some Garbage</label>
                <input {...getInputProps()} />
                {isOpen ? (
                  <div>
                    {this.state.keywordList
                      .filter(item => !inputValue || item.name.includes(inputValue))
                      .map((item, index) => (
                        <div
                          {...getItemProps({
                            key: item.name,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.name}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            )}
        </Downshift>
                      
            
            
            
        {this.state.submitSearch.map(result => {
          return (
            <div key={result.id} className="searchResults">
              <h2>{this.splitString(`${result.keywords}`)}</h2>
              <h2>{result.title}</h2>
              <>{this.decodeHtml(`${result.body}`)}</>
            </div>
          )
        })}
        </div> )
      }
      

}
export default Api;