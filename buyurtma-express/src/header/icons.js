import React from "react";
import IconWoman from "./catalog-icons/woman.png";
import IconMan from "./catalog-icons/men.png";
import IconBaby from "./catalog-icons/baby.png";
import IconHouse from "./catalog-icons/house.png";

export const Icon = ({ name, className, size }) => {
    if (name === "woman") {
        return <img src={IconWoman} alt="Woman Icon" className={className} style={{ width: size, height: size }} />;
    }
    if (name === "men") {
        return <img src={IconMan} alt="Man Icon" className={className} style={{ width: size, height: size }} />;
    }
    if (name === "baby") {
        return <img src={IconBaby} alt="Baby Icon" className={className} style={{ width: size, height: size }} />;
    }
    if (name === "house") {
        return <img src={IconHouse} alt="House Icon" className={className} style={{ width: size, height: size }} />;
    }
    return null;
};
