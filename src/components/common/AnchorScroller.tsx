import React from "react";

export function scrollIntoView() {
  const hash = window.location.hash;

  if (hash !== "") {
    const elementId = hash.slice(1);

    React.useEffect(
      () => {
        const element = document.getElementById(elementId);
        element?.scrollIntoView();
      }
    );
  }
}
