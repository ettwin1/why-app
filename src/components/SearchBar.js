
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
                className=""
                type="text"
                name="searchTerm"
                maxLength="255"
                placeholder="Search Here"
            />

            <button type="submit">Search</button>

        </form>
    );
}

export default SearchBar;