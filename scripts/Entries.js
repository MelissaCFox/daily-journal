/*
    Which function allows this component to get a copy
    of the data? Import it on the following line of code
    and then invoke it on the third line of code.
*/
import { getJournalEntries, deleteEntry, getTransientState, getSortedEntries, getEntryTags, getTags, getInstructors } from "./dataAccess.js"


const entryHTMLBuilder = (entry) => {
    const instructors = getInstructors()
    const tagEntries = getEntryTags()
    const tags = getTags()
    const relevantTagEntries = tagEntries.filter(
        (tagEntry) => {
            return tagEntry.entryId === entry.id
        }
    )
    let html = `
    <section class="entry-item">
    <section class="entry-item-date">${entry.date}</section>
    <section class="entry-item-concept">Concepts: ${entry.concepts}</section>
    <section class="entry-item-entry">"${entry.entry}"</section>
    `
    //Display instructor help if added
    const foundInstructor = instructors.find(
        (instructor) => {
            return instructor.id === entry.instructorId
        }
    )
    if (foundInstructor) {
        html += `<section class="entry-item-instructor">With the assistance of: ${foundInstructor.first_name} ${foundInstructor.last_name}</section>`
    }

    html += `<section class="entry-item-mood">Mood: ${entry.mood.mood}</section>`

    //Display Relevant tags if added
    if (relevantTagEntries.length > 0) {
        html += `<section class="entry-item-tags">Tags:`
        for (const tagEntry of relevantTagEntries) {
            const foundTag = tags.find(
                (tag) => {
                    return tag.id === tagEntry.tagId
                }
            )
            html += `<section class="entry-item-tag">"${foundTag.tag}"</section>`
        }
        html += `</section>`
    }
    
    

    html += `
            <button type="button" class="deleteEntry" id="entry--${entry.id}">Delete</button>
            </section>
            `
    return html

}


export const Entries = () => {
    // const entries = getJournalEntries()
    const sortedEntries = getSortedEntries()
    const transientState = getTransientState()
    let allEntriesAsHTML = ""

    for (const entry of sortedEntries) {

        if (transientState.moodFilterId) {

            if (entry.mood.id === transientState.moodFilterId) {
                allEntriesAsHTML += entryHTMLBuilder(entry)
            }

        } else {
            allEntriesAsHTML += entryHTMLBuilder(entry)
        }
    }
    return allEntriesAsHTML

}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("entry--")) {
        const [, entryId] = click.target.id.split("--")
        deleteEntry(parseInt(entryId))
    }

})