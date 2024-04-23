/* eslint-disable no-undef */
let modelStore =$state({
    show:false,
    message:"",
    duration: 0,
})

/**
 * @param message {string}
 * @param duration {number}
 */
export function showModle(message, duration){
        modelStore.show = true
        modelStore.message = message
        modelStore.duration = duration
    setTimeout(() => {
        hideModel()
    }, duration)
}
export function hideModel(){
    modelStore.show = false
    modelStore.message = ""
    modelStore.duration = 0

}