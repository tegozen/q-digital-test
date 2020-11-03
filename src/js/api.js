import data from "./data";


export const api = {
  dataByid: id => data.find((_data) => id === _data.id),
  setClasses: (defaultClasses = false, isActiveClasses = false) => {
    let classNames = [],
      className = "";

    if (defaultClasses) {
      classNames = defaultClasses;
    }

    if (isActiveClasses) {
      classNames.push(
        ...Object.keys(isActiveClasses)
          .map((className) => isActiveClasses[className] && className)
          .filter((className) => className)
      );
    }

    className = classNames.join(" ");

    return className;
  },
}

export default api;