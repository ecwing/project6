
import React, { Component } from 'react';
import axios from 'axios';
import Downshift from 'downshift'


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

  handleSearch = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
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

  render() {
    return (
      <div>
        <Downshift
          onChange={selection => this.setState({
            searchInput: selection.name,
          })}        
          itemToString={item => (item ? item.name : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            clearSelection,

            highlightedIndex,
            selectedItem,
          }) => (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label {...getLabelProps()}className="visuallyHidden">Search how to handle garbage here</label>
                  <input
                  {...getInputProps({
                    isOpen,
                    Placeholder: "Search"
                  })}
                    type="text"
                    id="searchInput"
                    value={this.state.searchInput}
                    onChange={this.handleSearch} 
                    {...getInputProps()} />
                  <input 
                  type="Submit"
                  defaultValue="Garbage Day"/>
                </form>
                {selectedItem ? (
                  //placing an SVG of a black X trying to make it ON click clear search using clearSelection.method and it errors out.
                 <svg
                  viewBox="0 0 20 20"
                  preserveAspectRatio="none"
                  width={12}
                  stroke="#000"
                  strokeWidth="1.1px"
                  onClick={clearSelection}
                  aria-label="clear selection">

                  <path d="M1,1 L19,19" />
                  <path d="M19,1 L1,19" />
                </svg>          
                ) : (null)
                    // <ControllerButton {...getToggleButtonProps()}>
                    //   <ArrowIcon isOpen={isOpen} />
                    // </ControllerButton>
                  }
                {isOpen ? (
                  <div className="dropdown">
                    {this.state.keywordList
                      .filter(item => !inputValue || item.name.includes(inputValue))
                      .map((item, index) => (
                        <div className="dropdown-item"
                          {...getItemProps({
                            key: item.name,
                            index,
                            item,
                            style: {
                              backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}>
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
              <h2>{this.state.searchInput}</h2>
              <>{this.decodeHtml(`${result.body}`)}</>
            </div>
          )
        })}

      </div> ) // end of render 
    }
      

}
export default Api;