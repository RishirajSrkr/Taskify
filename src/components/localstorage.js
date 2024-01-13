export function loadfromlocalstorage() {
    const NotebooksString = localStorage.getItem("notebooks")
    return NotebooksString ? JSON.parse(NotebooksString) : [];
}


export function savetolocalstorage(notebooks) {
    localStorage.setItem('notebooks', JSON.stringify(notebooks))
}

