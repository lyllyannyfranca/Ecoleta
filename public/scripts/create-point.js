/*() => {} é uma arrow function (função anonima)*/

function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")
    // utilização da API do IBGE para pegar os estados e cidade do BR
    // converte os dados capturados pela API em JSON
    // é a mesma coisa que (res) => { return resizeBy.json() }. Função anonima que retorna um valor
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() )  
    .then ( states => {

        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}

populateUFs()

function getCities (event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then ( res => res.json() )  
    .then ( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem (event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //Verificar itens selecionados e pegar os itens selecionados
    //Se já estiver selecionado, remover da seleção
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    //se já estiver selecionado,
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}