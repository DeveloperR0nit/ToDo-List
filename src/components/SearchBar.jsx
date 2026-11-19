import { Search } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function SearchBar({text, textSm}) {
  const { setSearchFilter } = useContext(TaskContext);
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <Search />
        <input
          type="search"
          name="search-bar"
          id="search-bar"
          placeholder={window.innerWidth > 576 ? text : textSm}
          onChange={(e) => setSearchFilter(e.currentTarget.value)}
        />
      </div>
    </div>
  );
}
