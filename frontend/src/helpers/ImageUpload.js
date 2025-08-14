const url = `${import.meta.env.VITE_CLOUDINARY_URL}`

const imageUpload = async(image) => {
    // console.log(url)
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset","iwdo5tqn")

    const dataResponse = await fetch(url, {
        method: "post",
        body: formData,
    })

    return dataResponse.json()
}

export default imageUpload