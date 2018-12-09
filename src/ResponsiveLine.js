import React, { Component } from 'react';
import { render } from 'react-dom'
import { ResponsiveLine } from '@nivo/line';
import './App.css';

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

class Responsiveline extends Component {
   constructor(props) {
      super(props)
      this.state = {
         greenBags: this.props.greenBags,
         garbageBags: this.props.garbageBags,
         blueBags: this.props.blueBags
      }
   }

   render() {
      return (
         <div className="LineApp">
            <ResponsiveLine
               data={[
                  {
                     "id": "Garbage",
                     "color": "hsl(215, 70%, 50%)",
                     "data": [
                        {
                           "x": "",
                           "y": 1
                        },
                        {
                           "x": "2",
                           "y": 129
                        },
                        {
                           "x": "3",
                           "y": 1
                        },
                        {
                           "x": "4",
                           "y": 59
                        },
                        {
                           "x": "5",
                           "y": 234
                        },
                        {
                           "x": "6",
                           "y": 92
                        },
                        {
                           "x": "7",
                           "y": 287
                        },
                        {
                           "x": "8",
                           "y": 255
                        },
                        {
                           "x": "9",
                           "y": 26
                        },
                        {
                           "x": "10",
                           "y": 164
                        }
                     ]
                  },
                  {
                     "id": "Recycling",
                     "color": "hsl(127, 70%, 50%)",
                     "data": [
                        {
                           "x": "",
                           "y": 57
                        },
                        {
                           "x": "2",
                           "y": 152
                        },
                        {
                           "x": "3",
                           "y": 114
                        },
                        {
                           "x": "4",
                           "y": 287
                        },
                        {
                           "x": "5",
                           "y": 284
                        },
                        {
                           "x": "6",
                           "y": 263
                        },
                        {
                           "x": "7",
                           "y": 28
                        },
                        {
                           "x": "8",
                           "y": 225
                        },
                        {
                           "x": "9",
                           "y": 232
                        },
                        {
                           "x": "10",
                           "y": 136
                        }
                     ]
                  },
                  {
                     "id": "Green",
                     "color": "hsl(58, 70%, 50%)",
                     "data": [
                        {
                           "x": "",
                           "y": 214
                        },
                        {
                           "x": "2",
                           "y": 143
                        },
                        {
                           "x": "3",
                           "y": 74
                        },
                        {
                           "x": "4",
                           "y": 136
                        },
                        {
                           "x": "5",
                           "y": 241
                        },
                        {
                           "x": "6",
                           "y": 112
                        },
                        {
                           "x": "7",
                           "y": 156
                        },
                        {
                           "x": "8",
                           "y": 222
                        },
                        {
                           "x": "9",
                           "y": 287
                        },
                        {
                           "x": "10",
                           "y": 274
                        }
                     ]
                  }
               ]}
               margin={{
                  "top": 1,
                  "right": 105,
                  "bottom": 60,
                  "left": 102
               }}
               xScale={{
                  "type": "point"
               }}
               yScale={{
                  "type": "linear",
                  "stacked": true,
                  "min": "auto",
                  "max": "auto"
               }}
               axisBottom={{
                  "orient": "bottom",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "Weeks",
                  "legendOffset": 36,
                  "legendPosition": "middle"
               }}
               axisLeft={{
                  "orient": "left",
                  "tickSize": 5,
                  "tickPadding": 5,
                  "tickRotation": 0,
                  "legend": "# of Bags",
                  "legendOffset": -40,
                  "legendPosition": "middle"
               }}
               enableGridY={false}
               colors="category10"

               lineWidth={7}
               lineHeight={10}
               enableDots={true}
               dotSize={10}
               dotColor="inherit:darker(0.3)"
               yScale={1}
               dotBorderWidth={2}
               dotBorderColor="#ffffff"
               enableDotLabel={true}
               dotLabel="y"
               dotLabelYOffset={-12}
               areaBlendMode="overlay"
               areaOpacity={0.9}
               animate={true}
               motionStiffness={90}
               motionDamping={15}
               legends={[
                  {
                     "anchor": "bottom-right",
                     "direction": "column",
                     "justify": true,
                     "translateX": 100,
                     "translateY": 0,
                     "itemsSpacing": 0,
                     "itemDirection": "left-to-right",
                     "itemWidth": 80,
                     "itemHeight": 20,
                     "itemOpacity": 0.75,
                     "symbolSize": 12,
                     "symbolShape": "circle",
                     "symbolBorderColor": "rgba(0, 0, 0, .5)",
                     "effects": [
                        {
                           "on": "hover",
                           "style": {
                              "itemBackground": "rgba(0, 0, 0, .03)",
                              "itemOpacity": 1
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

export default Responsiveline;
