
const SearchBar = ({ className, onSubmit }) => {

    const handleSubmit = (form) => {
        form.preventDefault();
        let searchTerm = form.target.searchTerm.value;
        searchTerm = searchTerm.replace("?", "") //Only replaces the first match
        //Insert more string manipulation to parse keywords out of the

        onSubmit(searchTerm);

    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            <input
                className="w-640 h-8 bg-gray-100 p-4"
                type="text"
                name="searchTerm"
                maxLength="255"
                placeholder="Search Here"
            />

            <button className="bg-gray-200 rounded p-1 px-2" type="submit">Search</button>

        </form>
    );
}

export default SearchBar;