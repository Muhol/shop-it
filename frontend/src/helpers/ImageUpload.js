// const url = `https://api.cloudinary.com/v1_1/${process.env.REACR_APP_IMAGE_UPLOAD_CLOUDINARY}/image/upload`
const url = `https://api.cloudinary.com/v1_1/dn5f0jksu/image/upload`

const imageUpload = async(image) => {
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