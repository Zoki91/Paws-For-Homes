const editPet = async (e) => {
    e.preventDefault()

    const typeOfPet = document.querySelector('input[name="#"]').value
    const description = document.querySelector('textarea[name="#"]').value.trim()
    const breed = document.querySelector('input[name="#"]').value.trim()
    const age = document.querySelector('input[name="#"]').value.trim()
    const gender = document.querySelector('input[name="#"]').value.trim()
    const location = document.querySelector('input[name="#"]').value.trim()
    const name = document.querySelector('input[name="#"]').value.trim()
    
    const pet_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/pets/${pet_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            typeOfPet,
            name,
            breed,
            age,
            gender,
            description,
            location
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/myaccount')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#').addEventListener('submit', editPet)