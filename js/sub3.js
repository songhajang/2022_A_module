const writeBtn = document.getElementById("WriteBtn")
const modal = document.getElementById("modal")
const modalBackGround = document.getElementById("modalBackground")

// modal on off
writeBtn.addEventListener("click", () => modal.style.display = "block" )       // modal on
modalBackGround.addEventListener("click", () => modal.style.display = "none" ) // modal off
// modal on off

function addReview() {
    const link = ""
    const data = {

    }
    
    $.ajax({
        url: link,
        method: "POST",
        data:
    })
}