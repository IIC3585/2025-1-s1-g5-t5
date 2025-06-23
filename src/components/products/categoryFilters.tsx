interface Props {
  title: string;
  filters?: string[];
}

export default function CategoryFilters({ title, filters = [] }: Props) {
  // Filtros estáticos predefinidos
  const defaultFilters = [
    "All Categories",
    "Suits",
    "Dresses", 
    "Casual Wear",
    "Formal Wear",
    "Accessories"
  ];

  const filterList = filters.length > 0 ? filters : defaultFilters;

  return (
    <div className="category-filters">
      <h6 className="font-weight-bold mb-3">{title}</h6>
      <div className="filter-options">
        {filterList.map((filter, index) => (
          <div key={index} className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              value={filter}
              id={`filter-${index}`}
              defaultChecked={index === 0}
            />
            <label className="form-check-label" htmlFor={`filter-${index}`}>
              {filter}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn btn-outline-primary btn-sm" type="button">
          Apply Filters
        </button>
        <button className="btn btn-link btn-sm text-secondary ms-2" type="button">
          Clear All
        </button>
      </div>
    </div>
  );
};
