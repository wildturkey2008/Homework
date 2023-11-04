
document.getElementById("submit").addEventListener("click", () => {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    let memos = localStorage.getItem("memos");
    if(memos){
        memos = JSON.parse(memos)
        memos.push({id:new Date().getTime().toString(),title: title, content: content})
    } else {
        memos = [{id:new Date().getTime().toString(),title: title, content: content}]
        console.log(memos)
    }
    localStorage.setItem("memos",JSON.stringify(memos))
    init()
})

function init(){
    let memos = localStorage.getItem("memos");
    console.log(memos)
    if(memos){
        memos = JSON.parse(memos)
        document.getElementById("list").textContent = ""
        memos.forEach((memo) => {
            const li = document.createElement("li")
            li.textContent = memo.title
            document.getElementById("list").appendChild(li)
        })
    }
}

init()