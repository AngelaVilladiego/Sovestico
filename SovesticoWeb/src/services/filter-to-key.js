export const filterToKey = (filter) => {
  switch (filter) {
    case "Governance":
      return "gov_score";
    case "Environmentalism":
      return "env_score";
    case "Social impact":
      return "soc_score";
    case "Doesn't produce vices":
      return "vice_products";
    case "Conservationism":
      return "ethical_concerns";
    case "No military involvement":
      return "military_involvement";
    case "Health conscioius":
      return "health_impact";
    case "Catholic values":
      return "catholic_values";
  }
};

export const keyToFilter = (filter) => {
  switch (filter) {
    case "governanceScore":
      return "Governance";
    case "environmentScore":
      return "Environmentalism";
    case "socialScore":
      return "Social impact";
  }
};
