/*
    Which function allows this component to get a copy
    of the data? Import it on the following line of code
    and then invoke it on the third line of code.
*/
import { getJournalEntries, deleteEntry, getTransientState, getSortedEntries, getEntryTags, getTags } from "./dataAccess.js"


const entryHTMLBuilder = (entry) => {
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
        <section class="entry-item-mood">Mood: ${entry.mood.mood}</section>
        <section class="entry-item-tags">Tags:
        `
    for (const tagEntry of relevantTagEntries) {
        const foundTag = tags.find(
            (tag) => {
                return tag.id === tagEntry.tagId
            }
        )
        if (foundTag) {

            html += `<section class="entry-item-tag">"${foundTag.tag}"</section>`
        }
    }

    html += `</section>
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