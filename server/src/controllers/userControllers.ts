import e, { Request, Response } from "express";
import { User } from "../models/userModels";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadCloudinaryImg } from "../utils/cloudinary";
import { AuthRequest } from "../middleware/authMiddleware";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exiting",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User register successFully",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not exiting",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User login successFully",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profile = async (
  req: AuthRequest,
  res: Response
) => {

  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile received successfully",
      user
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};

export const allUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User is not found"
      })
    }
    return res.status(201).json({
      success: true,
      message: "All User received successFully",
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const file = req.file?.path
  try {
    const exitEmail = await User.findOne({ email });
    if (exitEmail) {
      return res.status(404).json({
        success: false,
        message: "Email is already exiting"
      })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let cloudUri;
    if (file) {
      cloudUri = await uploadCloudinaryImg(file, "ProfileImg") || ""
    }
    const user = await User.create({
      name,
      email,
      profilePic: cloudUri,
      role,
      password: hashPassword,
    })
    return res.status(201).json({
      success: true,
      message: "User created successFully",
      user
    })
  } catch (error) {

  }
}

export const updateUserAdmin = async (req: Request, res: Response) => {
  const userId = req.params.id
  const { name, email, role } = req.body;
  const file = req.file?.path
  try {

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found"
      })
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (file) {
      const cloudUri = await uploadCloudinaryImg(file, "ProfileImg") || "";
      user.profilePic = cloudUri
    }
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User udpated successFully"
    })
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error"
    })
  }
}


export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found"
      })
    }
    return res.status(201).json({
      success: true,
      message: "User is deleted successFully"
    })
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal server error"
    })
  }
}