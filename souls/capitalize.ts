function capitalize(str: string) {
    return str.split(" ").map(each => {
      return `${each[0].toUpperCase()}${each.slice(1)}`
    }).join(" ")
}
