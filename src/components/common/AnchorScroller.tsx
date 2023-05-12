import React from "react";

export function scrollIntoView(location: any) {
  if (location.hash !== "") {
    const elementId = location.hash.slice(1);

    React.useEffect(
      () => {
        const element = document.getElementById(elementId);
        element?.scrollIntoView();
      }
    );
  }
}
