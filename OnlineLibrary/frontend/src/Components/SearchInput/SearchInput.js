import React from "react";


function search() {
        const filter_element_id = "categories";
        const search_element_id = "search";
        const search_query = document.getElementById(search_element_id).value;
        const filter_query = document.getElementById(filter_element_id).value;
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(search_element_id, search_query);
        params.set(filter_element_id, filter_query);
        if (String(url).includes("?") !== true) url = url + "?";
        let finalUrl = String(url) + params.toString();
        window.location.replace(finalUrl);
    }

export const SearchInput = () => {
    
  return (
    <div>
        <input
            className="search-input"
            type="text"
            id="search"
        />
        <button className="search-button" onClick={search}>Search</button>
    </div>
  )
}

export const FilterInput = () => {

    return (
        <div>
            <select name="categories" className="" id="categories" multiple>
                <option value="ab">Autobiography</option>
                <option value="ad">Adventure</option>
                <option value="bp">Biography</option>
                <option value="cs">Classics</option>
                <option value="cr">Criminal</option>
                <option value="es">Essay</option>
                <option value="fk">Folk </option>
                <option value="fs">Fantasy </option>
                <option value="hs">Historical </option>
                <option value="hr">Horror </option>
                <option value="hm">Humour and satire </option>
                <option value="lf">Literary fiction </option>
                <option value="ms">Mystery </option>
                <option value="nf">Non-fiction novel</option>
                <option value="pt">Poetry </option>
                <option value="ps">Plays </option>
                <option value="rm">Romance </option>
                <option value="sf">Science fiction </option>
                <option value="ss">Short stories </option>
                <option value="th">Thriller </option>
                <option value="wr">War </option>
                <option value="wf">Womens fiction </option>
                <option value="ya">Young adult </option>
                <option value="sh">Self-help</option>
            </select>
            <button className="filter-button" onClick={search}>Filter</button>
        </div>
    );
        
}
