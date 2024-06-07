import { useEffect, useState } from "react"

export const useDebounse = (value: string, delay = 500) => {
  const [debounced, setDebouncet] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncet(value)
    }, delay);
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced;
}