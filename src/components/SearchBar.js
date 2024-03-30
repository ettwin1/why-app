import { useRouter } from 'next/router';

const SearchBar = ({ className, searchTerm }) => {
    const router = useRouter();
    const handleSubmit = (form) => {
        form.preventDefault();
        let term = form.target.searchTerm.value;
        term = term.replace("?", "") //Only replaces the first match

        router.push("/?search=" + encodeURIComponent(term));

    }

    return (
        
        <form className={className} onSubmit={handleSubmit}>
            <img className="inline mr-2" src="./images/search_icon.png" width={24} height={24} />
            <input
                className="w-640 h-8 bg-gray-100 p-4"
                type="text"
                name="searchTerm"
                maxLength="255"
                placeholder="Search Here"
                defaultValue={searchTerm}
            />

            <button className="bg-gray-200 rounded p-1 px-2" type="submit">Search</button>

        </form>
    );
}

export default SearchBar;