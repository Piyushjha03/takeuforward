
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import { FormPage } from './components/form/formPage'
import { DataPage } from './components/data/dataPage'


function App() {


  return (
    <>
    <div className="form-page-wrapper bg-primary text-primary-foreground p-[10px]">
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </div>

    </>
  )
}

export default App
