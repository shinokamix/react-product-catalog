import "./SearchBar.css";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="search-bar">
            <label
                className="search-bar__label"
                htmlFor="catalog-search"
            >
                Поиск по названию
            </label>
            <input
                id="catalog-search"
                className="search-bar__input"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Например, iPhone"
            />
        </div>
    );
}
