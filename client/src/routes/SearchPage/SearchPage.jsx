import { useSearchParams } from "react-router"
import Gallery from "../../components/Gallery/Gallery"
import "./SearchPage.css"
import { useDebounce } from "use-debounce"
import { useEffect } from "react"

const SearchPage = () => {
  let [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || "";
  const [debouncedSearch] = useDebounce(searchTerm, 500); 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [debouncedSearch]);


  return (
    <div>
        <Gallery search={debouncedSearch}/>
    </div>
  )
}

export default SearchPage