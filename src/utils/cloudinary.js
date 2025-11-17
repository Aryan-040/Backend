import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null 

        const response = await cloudinary.uploader.upload(localfilepath , {
            response_type : "auto"
        })
        //console.log (" file has been  uploaded ",response.url)
        fs.unlinkSync(localfilepath)
        return response ;
    }catch (error){
        fs.unlinkSync (localfilepath)
        return null 
    }
}

const extractPublicIdFromUrl = (url = "") => {
    try {
        const { pathname } = new URL(url)
        const withoutExtension = pathname.substring(0, pathname.lastIndexOf("."))
        const uploadIndex = withoutExtension.indexOf("/upload/")

        if (uploadIndex === -1) {
            return null
        }

        const pathAfterUpload = withoutExtension.substring(uploadIndex + "/upload/".length)
        return pathAfterUpload.replace(/^v\d+\//, "")
    } catch (error) {
        console.warn("Failed to parse Cloudinary public ID:", error?.message || error)
        return null
    }
}

const deleteFromCloudinary = async (identifier) => {
    try {
        if (!identifier) return

        const publicId = identifier.startsWith("http")
            ? extractPublicIdFromUrl(identifier)
            : identifier

        if (!publicId) return

        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.warn("Failed to delete asset from Cloudinary:", error?.message || error)
    }
}

export { deleteFromCloudinary }
export default uploadOnCloudinary
