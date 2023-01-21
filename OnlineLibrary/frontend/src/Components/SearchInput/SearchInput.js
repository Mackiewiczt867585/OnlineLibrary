import React from "react";


const categories = [
    {"id":1,"name":"Adventure"},
    {"id":2,"name":"Classics"},
    {"id":3,"name":"Criminal"},
    {"id":4,"name":"Folk"},
    {"id":5,"name":"Fantasy"},
    {"id":6,"name":"Historical"},
    {"id":7,"name":"Horror"},{"id":8,"name":"Humour and satire"},
    {"id":9,"name":"Literary fiction"},
    {"id":10,"name":"Mystery"},
    {"id":11,"name":"Poetry"},
    {"id":12,"name":"Plays"},
    {"id":13,"name":"Romance"},
    {"id":14,"name":"Science fiction"},
    {"id":15,"name":"Short stories"},
    {"id":16,"name":"Thriller"},
    {"id":17,"name":"War"},
    {"id":18,"name":"Womens fiction"},
    {"id":19,"name":"Young adult"},
    {"id":20,"name":"Autobiography"},
    {"id":21,"name":"Biography"},
    {"id":22,"name":"Essay"},
    {"id":23,"name":"Non-fiction novel"},
    {"id":24,"name":"Self-help"},
]

function search() {

        const search_element_id = "search";
        const search_query = document.getElementById(search_element_id).value;
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search);
        params.set(search_element_id, search_query);
        let finalUrl = params.toString();
        if (finalUrl.includes("?") !== true) finalUrl = "?" + finalUrl;
        window.location.replace(finalUrl);
    }

function filter() {
    const filter_element_id = "categories";
    const filter_query = document.getElementById(filter_element_id).value;
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set(filter_element_id, filter_query);
    let finalUrl = params.toString() + "&";
    if (finalUrl.includes("?") !== true) finalUrl = "?" + finalUrl;
    window.location.replace(finalUrl);
}

function Filters(){

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let active_filters_list = [];
    params.forEach((value, key) => {
        if (key === "search") {
            active_filters_list.push(<p>{key}:{value}</p>)
        }
        else {
            let temp_element = categories.find(element => element.id === parseInt(value));
            active_filters_list.push(
                <p>{key}:{temp_element.name}</p>
            );
        }
    });
    if (active_filters_list.length === 0) return (
       <div>
           No active filters.
       </div>
    ) ;

    return (
        <div>
            {active_filters_list}
        </div>
    )
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
        <div className="row">
            <div className="col-sm-6">
            <select onChange={filter} name="categories" className="" id="categories" multiple>
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
            </div>
            <div className="col-sm-6">
                <p>Active filters:</p>
                {Filters()}
            </div>
        </div>
    );
        
}
