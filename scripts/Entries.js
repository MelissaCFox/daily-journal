/*
    Which function allows this component to get a copy
    of the data? Import it on the following line of code
    and then invoke it on the third line of code.
*/
import {getJournalEntries, deleteEntry, getTransientState, getSortedEntries } from "./dataAccess.js"


export const Entries = () => {
    // const entries = getJournalEntries()
    const sortedEntries = getSortedEntries()
    const transientState = getTransientState()
    let allEntriesAsHTML = ""

    for (const entry of sortedEntries) {
        
        if (transientState.moodFilterId) {
            
            if (entry.mood.id === transientState.moodFilterId) {
                allEntriesAsHTML += `
                <section class="entry-item-date">${entry.date}</section>
                <section class="entry-item-concept">${entry.concepts}</section>
                <section class="entry-item-entry">"${entry.entry}"</section>
                <section class="entry-item-mood">${entry.mood.mood}</section>
                <button type="button" class="deleteEntry" id="entry--${entry.id}">Delete</button>
                `
            }     

        } else {
            allEntriesAsHTML += `
                <section class="entry-item-date">${entry.date}</section>
                <section class="entry-item-concept">${entry.concepts}</section>
                <section class="entry-item-entry">"${entry.entry}"</section>
                <section class="entry-item-mood">${entry.mood.mood}</section>
                <button type="button" class="deleteEntry" id="entry--${entry.id}">Delete</button>
                `
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