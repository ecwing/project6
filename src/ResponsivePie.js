import React, { Component } from 'react';
import { render } from 'react-dom'
import { ResponsivePie } from 'nivo';
import './App.css';

// npm install @nivo/pie --save NPM INSTALL THAT 


class Responsivepie extends Component {
  constructor(props){
  super(props)
    this.state = {
      greenBags: this.props.greenBags,
      garbageBags: this.props.garbageBags,
      blueBags: this.props.blueBags
    }
  }

   render() {
      return (
         <div className="PieApp">
            <ResponsivePie
               data={[
                  {
                     "id": "garbage",
                     "label": "garbage",
                     "value": this.props.garbageBags,
                     "color": "hsl(0, 100%, 0%)"
                  },
                  {
                     "id": "blueBin",
                     "label": "blueBin",
                     "value": this.props.blueBags,
                     "color": "hsl(243, 70%, 50%)"
                  },
                  {
                     "id": "greenBin",
                     "label": "greenBin",
                     "value": this.props.greenBags,
                     "color": "hsl(316, 70%, 50%)"
                  },
               ]}
               margin={{
                  "top": 40,
                  "right": 80,
                  "bottom": 80,
                  "left": 80
               }}
               innerRadius={0.25}
               padAngle={0.7}
               cornerRadius={3}
               colors="set1"
               colorBy="id"
               borderWidth={1}
               borderColor="inherit:darker(0.6)"
               radialLabelsSkipAngle={10}
               radialLabelsTextXOffset={6}
               radialLabelsTextColor="#333333"
               radialLabelsLinkOffset={0}
               radialLabelsLinkDiagonalLength={16}
               radialLabelsLinkHorizontalLength={24}
               radialLabelsLinkStrokeWidth={1}
               radialLabelsLinkColor="inherit"
               slicesLabelsSkipAngle={10}
               slicesLabelsTextColor="#333333"
               animate={true}
               motionStiffness={90}
               motionDamping={15}
               defs={[
                  {
                     "id": "dots",
                     "type": "patternDots",
                     "background": "inherit",
                     "color": "rgba(255, 255, 255, 0.3)",
                     "size": 4,
                     "padding": 1,
                     "stagger": true
                  },
                  {
                     "id": "lines",
                     "type": "patternLines",
                     "background": "inherit",
                     "color": "rgba(255, 255, 255, 0.3)",
                     "rotation": -45,
                     "lineWidth": 6,
                     "spacing": 10
                  }
               ]}
               fill={[
                 
               ]}
               legends={[
                  {
                     "anchor": "bottom",
                     "direction": "row",
                     "translateY": 56,
                     "itemWidth": 100,
                     "itemHeight": 18,
                     "itemTextColor": "#999",
                     "symbolSize": 18,
                     "symbolShape": "circle",
                     "effects": [
                        {
                           "on": "hover",
                           "style": {
                              "itemTextColor": "#000"
                           }
                        }
                     ]
                  }
               ]}
            />
         </div>
      );
   }
}

export default Responsivepie;
