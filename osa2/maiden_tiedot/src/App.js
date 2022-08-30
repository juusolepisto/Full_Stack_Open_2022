import { useEffect } from "react";
import axios from 'axios'

const SearchBar = () => {
  return(
    <div>
      find countries&nbsp;<input/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  return (
    <div>
      <SearchBar />
    </div>
  );
}

export default App;
