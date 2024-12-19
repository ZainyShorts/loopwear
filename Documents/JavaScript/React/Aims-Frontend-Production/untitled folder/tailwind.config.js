/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT( {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {

    container:{
      padding:{
        DEFAULT:'15px'
      }
    },
    screens:{
      sm:"480px",
      md:"768px",
      lg:"1024px",
      xl:"1280px",
    },
    fontFamily:{
      nunito:['Nunito', 'sans-serif']
    },
   
    extend: {
      spacing:{
        "big":"48rem"
      },
      
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: 'translate3d(0, -1rem, 0)'
          }
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      animation: {
        typing: "typing 7s steps(25)  alternate, blink .9s infinite",
        loader: 'loader 0.6s infinite alternate'
      },
   
      colors: {
        
        primary: "#00040f",
        secondary: "#00f6ff",
        accent:{
          DEFAULT:'#1cbccf',
          secondary:'#18abbc',
          tetiary:'#90c6cd'
        },
        grey : '#e8f0f1',
        slatt:'#1e40af',
        dimWhite: "rgba(255, 255, 255, 0.7)",
        bluu: "#E8EAF6",
        blux:"rgba(100, 122, 212, 1)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        bleuvert:"rgba(115, 135, 145, 1)",
        bb:"#082f49",
        bl:"#1e3a8a",
        yellow: "#ffe700",
        bf:'#1A237E',
        deep:'#5C6BC0',
      },
      fontFamily: {
        primary:"IMFellEnglish-Regular",
        prim:"BreeSerif",
        prima:"PTSans",
        ist:"ist",
        anton:"anton",
        istbold:"istbold",
        myriadpro:" myriadpro",
        myriadregular:"myriadregular",
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow:{
        costm1:'0px 2px 40px 0px rbga(8,70,78,0.08)'
      }
    },
    // screens: {
    //   xs: "480px",
    //   ss: "620px",
    //   sm: "768px",
    //   md: "1060px",
    //   lg: "1200px",
    //   xl: "1700px",
    // },
  },
  variants: {
    extend: {}
  },
  plugins: [],
});