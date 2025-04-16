import React, { useState } from "react";

const SearchableDropdown = ({ options, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState("Select an option");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (option) => {
        setSelected(option.name);
        setShowDropdown(false);
        onSelect(option); // pass selected item to parent
    };

    const filteredOptions = options?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="uk-inline uk-width-1-1">
            <button
                className="uk-button uk-button-default uk-width-1-1"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {selected}
            </button>

            {showDropdown && (
                <div
                    className="uk-dropdown uk-padding-small uk-width-1-1"
                    style={{ display: "block", position: "absolute", zIndex: 999 }}
                >
                    <input
                        className="uk-input uk-margin-small-bottom"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <ul className="uk-list uk-margin-remove">
                        {filteredOptions.map((option, i) => (
                            <li key={i}>
                                <a
                                    href="#!"
                                    onClick={() => handleSelect(option)}
                                    className="uk-link-reset"
                                >
                                    {option.name}
                                </a>
                            </li>
                        ))}
                        {filteredOptions.length === 0 && <li>No matches found.</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;
