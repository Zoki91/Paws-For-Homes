const deletePet = async (e) => {
    e.preventDefault()

    const pet_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/pets/${pet_id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/myaccount')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#delete-btn').addEventListener('click', deletePet)