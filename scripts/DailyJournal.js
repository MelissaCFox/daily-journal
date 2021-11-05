import { Entries } from "./Entries.js"
import {JournalForm} from "./JournalForm.js"
import { MoodFilter } from "./MoodFilter.js"

export const DailyJournal = () => {
    return `
        <form class="entryForm">
        <h2>What Have We Learned?</h2>
            ${JournalForm()}
        </form>
        
        <section class="moodFilter">
        ${MoodFilter()}
        </section>

        <section class="entryList">
        <h1>Entries</h1>
            ${ Entries() }
        </section>
    `
}