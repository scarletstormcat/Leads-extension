let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
         listItems += `
            <li id ="${leads[i]}">
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <button class="mini-button" onClick="deleteLead(${i})">delete</button>
            </li>
        ` 
    }
    ulEl.innerHTML = listItems
}


function deleteLead(thisLead) {
    console.log("pressed delete btn")
    delete myLeads[thisLead]
    myLeads = myLeads.filter(function(x) {
            return x !== undefined
        })
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))    
    
    render(myLeads)
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if(inputEl.value) {
        myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    }
    
})

