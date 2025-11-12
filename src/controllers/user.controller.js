import ApiError from "../utils/apiError.js"
import asynHandler from "../utils/asyncHandler.js"

const registerUser = asynHandler ( async (req,res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

   const { fullName , email, password, username } = req.body
   
   if(
    [ fullName, email, password, username ].some((field) => field.trim() === "")
   ){
    throw new ApiError (400 , "All fields are required")
   }
    const existedUser = UserActivation.findOne({
        $or : [{ username } ,{ email }]
    })
    if ( existedUser ){
        throw new ApiError (409 , "User already exist")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if ( avatarLocalPath ) {
        throw new ApiError (400, "Avatar not found")
    }
    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverImageLocalPath)

    if ( avatar ){
        throw new ApiError ( 400, "Avatar is required" )
    }
    const User = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        password,
        username :username.lowercase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if ( !createdUser ){
        throw new Error (500, "Something went wrong while registering the user ")
    }

    res.status(200).json({
        message : "success"
    })
})
export default registerUser