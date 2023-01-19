import React from "react";


function search() {

        const search_element_id = "search";
        const search_query = document.getElementById(search_element_id).value;
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(search_element_id, search_query);
        if (String(url).includes("?") !== true) url = url + "?";
        let finalUrl = String(url) + params.toString();
        window.location.replace(finalUrl);
    }

function filter() {
    const filter_element_id = "categories";
    const filter_query = document.getElementById(filter_element_id).value;
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
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
                <option value="20">Autobiography</option>
                <option value="1">Adventure</option>
                <option value="21">Biography</option>
                <option value="2">Classics</option>
                <option value="3">Criminal</option>
                <option value="22">Essay</option>
                <option value="4">Folk </option>
                <option value="5">Fantasy </option>
                <option value="6">Historical </option>
                <option value="7">Horror </option>
                <option value="8">Humour and satire </option>
                <option value="9">Literary fiction </option>
                <option value="10">Mystery </option>
                <option value="23">Non-fiction novel</option>
                <option value="11">Poetry </option>
                <option value="12">Plays </option>
                <option value="13">Romance </option>
                <option value="14">Science fiction </option>
                <option value="15">Short stories </option>
                <option value="16">Thriller </option>
                <option value="17">War </option>
                <option value="18">Womens fiction </option>
                <option value="19">Young adult </option>
                <option value="24">Self-help</option>
            </select>
            <button className="filter-button" onClick={filter}>Filter</button>
        </div>
    );
        
}
