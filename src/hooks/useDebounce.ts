import { useEffect, useState } from "react";

// Imagine a search box. Every keystroke changes value.
// If you called an API on every keystroke, typing "react"
// would fire 5 requests (r, re, rea, reac, react).
// A debounce says: "Wait until the user stops typing for a moment (400 milleseconds),
// then use the latest value."
export function useDebounce<T>(value: T, delay: number = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        // setTimeout schedules a function to run after delay ms.
        // setTimeout returns an id (a number you can use to cancel the timer).
        // We save it as id.
        const id = setTimeout(() => setDebounced(value), delay);

        // This is the cleanup useEffect function. React runs it:
        // Right before the effect runs again (when value or delay changed), and
        // When the component unmounts.
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}