import Navbar from "./components/Navbar/Navbar.jsx"
import "./App.css"
import Slider from "./components/Slider/Slider.jsx"
import SmartphoneCards from "./components/SmartphoneCards/SmartphoneCards.jsx"
import AccessoriesCards from "./components/AccessoriesCards/AccessoriesCards.jsx"
import Footer from "./components/Footer/Footer.jsx"

const slides = []
const App = ()=> {

  return (
    <>
    <Navbar/>
    <Slider/>
    <SmartphoneCards/>
    <AccessoriesCards/>
    <Footer/>
    </>
  )
}

export default App
