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
    tags: [],
    entryTags: [],
    instructors: [],
    transientState: {
        instructorId: null,
        moodId: null,
        moodFilterId: null,
        entryTags: new Set()
    }
}

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/

const API = "http://localhost:8088"

//fetch all relevant data from JSON server
export const fetchData = () => {
    fetch(`${API}/entries?_expand=mood`) // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            database.entries = entries//What should happen when we finally have the array
        })
    fetch(`${API}/tags`) // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(tags => {
            database.tags = tags//What should happen when we finally have the array
        })
    fetch(`${API}/entryTags`) // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entryTags => {
            database.entryTags = entryTags//What should happen when we finally have the array
        })
    fetch(`${API}/instructors`) // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(instructors => {
            database.instructors = instructors//What should happen when we finally have the array
        })
    return fetch(`${API}/moods`) // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(moods => {
            database.moods = moods//What should happen when we finally have the array
        })
}

//Get application state/database data
export const getJournalEntries = () => {
    return database.entries.map(entry => ({ ...entry }))
}

export const getSortedEntries = () => {
    return database.entries.sort(
        (a, b) => {
            return b.dateToSort - a.dateToSort
        }
    )
}

export const getMoods = () => {
    return database.moods.map(mood => ({ ...mood }))
}

export const getTags = () => {
    return database.tags.map(tag => ({ ...tag }))
}

export const getEntryTags = () => {
    return database.entryTags.map(tag => ({ ...tag }))
}

export const getInstructors = () => {
    return database.instructors.map(instructor => ({...instructor}))
}

export const getTransientState = () => {
    return database.transientState
}

//Set TransientState Info
export const setInstructorId = (id) => {
    database.transientState.instructorId = id
}

export const setMood = (id) => {
    database.transientState.moodId = id
}

export const setMoodFilterId = (id) => {
    database.transientState.moodFilterId = id
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setEntryTags = (tag) => {
    database.transientState.entryTags.add(tag)
}


//Fetch Options
const createEntryTags = (userEntry) => {
    const fetchArrays = []
    database.transientState.entryTags.forEach(
        (entryTag) => {
            const foundTag = database.tags.find(
                (tag) => {
                    return tag.tag === entryTag
                }
            )
            if (!foundTag) {
                fetchArrays.push(fetch(`${API}/tags`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tag: entryTag
                    })
                })
                    .then(response => response.json())

                    //capture id of newly created tag and use to create an entrytagobj
                    .then((newTagObject) => {
                        fetchArrays.push(fetch(`${API}/entryTags`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                tagId: newTagObject.id,
                                entryId: userEntry.id
                            })
                        })
                            .then(response => response.json())
                            .then(() => {  
                            }))

                    }))
            } else {
                //post new entry tag with foundTag.id
                fetchArrays.push(fetch(`${API}/entryTags`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tagId: foundTag.id,
                        entryId: userEntry.id
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                    }))
            }
        }
    )
    Promise.all(fetchArrays).then(
        () => {
            console.log("All fetches complete")
        }
    )
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

    return fetch(`${API}/entries`, fetchOptions)
        .then(response => response.json())
        .then((userEntryObj) => {
            createEntryTags(userEntryObj)
            database.getTransientState = {}
            database.transientState.entryTags = new Set()
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteEntry = (entryId) => {
    return fetch(`${API}/entries/${entryId}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}