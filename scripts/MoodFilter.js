import { getMoods, getTransientState, setMoodFilterId } from "./dataAccess.js"

export const MoodFilter = () => {
    const moods = getMoods()

    const transientState = getTransientState()
    let html = `      
            <fieldset class="fieldset">
            <legend>Filter Journal Entries by Mood</legend>
            <section class="filterOptions">
            `

    if (transientState.moodFilterId) {
        html += `<label><input type="radio" name="moodFilter" value="null" />All</label>`
        for (const mood of moods) {
            if (transientState.moodFilterId === mood.id) {
                html += `
                        <label>
                        <input type="radio" name="moodFilter" id="moodFilter--${mood.mood}"value="${mood.id}" checked="checked"/>
                        ${mood.mood}
                        </label>
                        `

            } else {
                html += `
                        <label>
                        <input type="radio" name="moodFilter" id="moodFilter--${mood.mood}"value="${mood.id}"/>
                        ${mood.mood}
                        </label>
                        `
            }
            
        }
    } else {
        html += `<label><input type="radio" name="moodFilter" value="null" checked="checked"/>All</label>`

        for (const mood of moods) {
            html += `
                    <label>
                    <input type="radio" name="moodFilter" id="moodFilter--${mood.mood}"value="${mood.id}"/>
                    ${mood.mood}
                    </label>
                     `

        }

    }
    html += `</section></fieldset>`
    return html


    // return `
    //         <fieldset class="fieldset">
    //         <legend>Filter Journal Entries by Mood</legend>
    //         <section class="filterOptions">
    //         <label><input type="radio" name="moodFilter" value="null" />All</label>
    //         ${moods.map(
    //     (mood) => {
    //         return `
    //                     <label>
    //                     <input type="radio" name="moodFilter" id="moodFilter--${mood.mood}"value="${mood.id}"/>
    //                     ${mood.mood}
    //                     </label>
    //                     `
    //     }
    // ).join("")
    //     }
    //         </section>
    //         </fieldset>`

}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("change", event => {
    if (event.target.name === "moodFilter") {
        setMoodFilterId(parseInt(event.target.value))
    }
})

