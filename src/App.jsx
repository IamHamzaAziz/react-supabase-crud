import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import UpdateNote from "./pages/UpdateNote"
import AddNote from "./pages/AddNote"

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/update/:id" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
