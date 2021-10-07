import React from "react";


export default function MarkerPopup ({ feature }) {
    let popupContent;
    if (feature.properties && feature.properties.popupContent) {
      popupContent = feature.properties.popupContent;
    }
  
    return (
      <div>
        <a href={feature.properties.uri} target="_blank" rel="noreferrer noopener">{`${feature.properties.name}`}</a>
        
      </div>
    );
  };