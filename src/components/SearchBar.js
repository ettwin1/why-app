
const SearchBar = ({ className, onSubmit }) => {

    const handleSubmit = (form) => {
        form.preventDefault();
        const searchTerm = form.target.searchTerm.value;
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