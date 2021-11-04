/*
 *   Data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

const database = {
    moods: [],
    entries: [],
    transientState: {}
}

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/

export const fetchData = () => {
    fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            database.entries = entries//What should happen when we finally have the array
        })
    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(moods => {
            database.moods = moods//What should happen when we finally have the array
        })
}

export const getJournalEntries = () => {
    return database.entries.map(entry => ({ ...entry }))
}

export const getSortedEntries = () => {
    return database.entries.sort(
        (a,b) => {
            return b.dateToSort - a.dateToSort
        }
    )
}

export const getMoods = () => {
    return database.moods.map(mood => ({ ...mood }))
}

export const getTransientState = () => {
    return database.transientState
}


export const setMood = (id) => {
    database.transientState.moodId = id
}

export const setMoodFilterId = (id) => {
    database.transientState.moodFilterId = id
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}


const mainContainer = document.querySelector("#container")

export const saveEntry = (userEntry) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userEntry)
    }

    return fetch(`http://localhost:8088/entries`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteEntry = (entryId) => {
    return fetch(`http://localhost:8088/entries/${entryId}`, { method: "DELETE" })
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}