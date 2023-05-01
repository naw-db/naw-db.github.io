const BRAND_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const STYLE_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const COLOR_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00"
};

const RARITY_SORT_ORDER = {
  "N/A": "0",
  "Varies": "00",
  "Starter": "000",
  "All-Star": "0000",
  "All-World": "00000"
};

export function generateBrandOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = BRAND_SORT_ORDER[a] ? BRAND_SORT_ORDER[a] : a;
          const normalizedB = BRAND_SORT_ORDER[b] ? BRAND_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateStyleOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          const normalizedA = STYLE_SORT_ORDER[a] ? STYLE_SORT_ORDER[a] : a;
          const normalizedB = STYLE_SORT_ORDER[b] ? STYLE_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateColorOptions(data, selectFieldFunction) {
  return new Set(
    data.flatMap(e => selectFieldFunction(e).split("/"))
      .map(e => e.trim())
      .sort(
        (a, b) => {
          const normalizedA = COLOR_SORT_ORDER[a] ? COLOR_SORT_ORDER[a] : a;
          const normalizedB = COLOR_SORT_ORDER[b] ? COLOR_SORT_ORDER[b] : b;

          return normalizedA.localeCompare(normalizedB);
        }
      )
  );
}

export function generateRarityOptions(data, selectFieldFunction) {
  return new Set(
    data.map(e => selectFieldFunction(e))
      .sort(
        (a, b) => {
          return RARITY_SORT_ORDER[a].localeCompare(RARITY_SORT_ORDER[b]);
        }
      )
  );
}
