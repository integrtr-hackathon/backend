import { Role } from "../models/roles.models.js";

export const getRoles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [roles, totalRoles] = await Promise.all([
      Role.find().skip(skip).limit(limit),
      Role.countDocuments(),
    ]);
    res.status(200).json({
      data: roles,
      pagination: {
        totalResults: totalRoles,
        currentPage: page,
        totalPages: Math.ceil(totalRoles / limit),
      },
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
