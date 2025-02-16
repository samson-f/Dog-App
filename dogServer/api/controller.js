const user = require("../models/userModel.js");
const FavoriteImg = require("../models/favoriteImgModel.js");
const { json } = require("express");
const mongoose = require("mongoose");
// const utils = require('./utils.js');


// // ! WHEN USER IS DELETED ALL HIS USERS ARE DELTETED
// ! IF FAV-PIC THAT IS DELETED IS PROFILEPIC, DELETE PROFILEPIC

// USER CONTROLLERS
exports.addUser = async function (req, res) {
  try {
    const userName = req.body.name;
    // let newUser = await user.create(userName);
    const newUser = new user({name: userName}); //! 16 = 17-18
    await newUser.save();
    res.status(201).json({
      status: "success",
      data: newUser,
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error" + err.message,
    });
  }
};

exports.getAllUsers = async function (_, res) {
  try {
    const users = await user.find();
    res.status(200).json({
      status: "success",
      data: users,
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error" + err,
    });
  }
};

exports.getUserById = async function (req, res) {
    try {
        const userId = req.params.id;
        const userFound = await user.findById(userId);

        if(!userFound) {
          return res.status(404).json({
            status: 'fail',
            message: 'User not found'
          });
        }

        res.status(200).json({
            status: "success",
            data: userFound
          });

    } catch (err) {
        res.status(400).json({
        status: "fail",
        message: "error" + err.message,
        });
    }
};

exports.updateNameById = async function (req, res) {
  try {
    const updateData = { name: req.body.name };
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if(!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      satus: 'success',
      data: updatedUser
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'error' + err.message
    })
  }
};

exports.updateProfileById = async function (req, res) {
  try {
    const favoriteCount = await FavoriteImg.countDocuments(
      {_id: req.body.profilePic, user: req.params.id}
    );

    if (!favoriteCount) {
      return res.status(404).json({
        status: 'fail',
        message: 'User did not like this image'
      })
    }

    const id = req.params.id;
    const updateData = { profilePic: req.body.profilePic};
    user.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if(!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      satus: 'success',
      data: updateData
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'error' + err.message
    })
  }
};

exports.deleteUserById = async function (req, res) {
  try {
    const id = req.params.id;
    const result = await user.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        status: "fail",
        message: 'user not found',
      })
    }
    await FavoriteImg.deleteMany({user: id});
    res.status(200).json({
      status: "success",
      data: null,
    })
  } catch(err) {
    res.status(400).json({
      status: "fail",
      message: 'error' + err.message
    });
  }
};

exports.deleteProfileById = async function (req, res) {
  try {
    const curUser = await user.updateOne(
      {_id: req.params.id},
      {$unset: {profilePic: 1}}
    );

    if (!curUser.matchedCount) {
      return res.stasus(404).json({
        stasus: "fail",
        message: "user not found",
      });
    }

    if (!user.modifiedCount) {
      return res.status(400).json({
        status: 'fail',
        message: 'no profilePic to begin with'
      })
    }

    return res.status(200).json({
      status: "success",
      data: updatedUser,
    });

  } catch (err) {
    res.status(400).json({
      stasus: "fail",
      message: "error" + err,
    });
  }
};

// FavoriteImgS CONTROLLERS
exports.addFavorite = async function (req, res) {
  try {
    const userCount = await user.countDocuments({_id: req.params.id});
    if (!userCount) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
    const newFavorite = new FavoriteImg({
      imgSrc: req.body.imgSrc,
      user: req.params.id
    });
    await newFavorite.save();
    res.status(201).json({
      status: "success",
      data: newFavorite,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error" + err,
    });
  }
};

exports.getFavoritesById = async function (req, res) {
  const query = {user: req.params.id};
  if(req.query.name) {
    query.name = {$regex: req.query.name};
  }

  const options = {};
  if (req.query.limit) {
    options.limit = +req.query.limit;
  }

  if (req.params.skip) {
    options.skip = + req.query.skip;
  }

  const userCount = await user.countDocuments({_id: req.params.id});
  if (!userCount) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }

  try {
      const allFavorites = await FavoriteImg.find(query, {}, options);
      res.status(200).json({
          status: "success",
          data: allFavorites,
        });
  } catch (err) {
      res.status(404).json({
      status: "fail",
      message: "error" + err.message,
      });
  }
}

exports.updateFavoriteNameById = async function (req, res) {
  try {
    const updatedFavorite = await FavoriteImg.findByIdAndUpdate(
      req.params.favId,
      { $set: { name: req.body.name } },
      { new: true, runValidators: true }
    );

    if (!updatedFavorite) {
      return res.status(404).json({
        status: "fail",
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedFavorite,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error" + err.message,
    });
  }
};

exports.deleteFavoriteByID = async function (req, res) {
  try {
    const result = await FavoriteImg.deleteOne({
      _id: req.params.favId,
      user: req.params.id
    });

    if (!result.deletedCount) {
      return res.status(404).json({
        status: "fail",
        message: "Favorite not found",
      });
    }

    await user.updateOne(
      {_id: req.params.id, profilePic: req.params.favId},
      {$unset: {profilePic: 1}}
    );
      res.status(200).json({
        status: "success",
        data: null,
      });
  } catch(err) {
      res.status(400).json({
        status: "success",
        message: "error" + err.message
      });
  }
  // // ! IF FAV-PIC THAT IS DELETED IS PROFILEPIC, DELETE PROFILEPIC
};

exports.deleteFavoriteNameByID = async function (req, res) {
  try {
    const updatedFavorite = await FavoriteImg.findByIdAndUpdate(
      req.params.favId,
      { $unset: { name: 1 } },
      { new: true, runValidators: true }
    );

    if (!updatedFavorite) {
      return res.status(404).json({
        status: "fail",
        message: "No document found with the given ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedFavorite,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "error" + err.message,
    });
  }
};
