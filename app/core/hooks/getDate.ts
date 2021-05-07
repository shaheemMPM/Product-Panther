function join(t, a, s: String) {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m)
    return f.format(t)
  }
  return a.map(format).join(s)
}

export const useGetDay = (timestamp) => {
  const a = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }]
  let s = join(new Date(timestamp), a, " ")
  return s
}
