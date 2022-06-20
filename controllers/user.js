const { User } = require("../models");

createUser = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      res.status(400).json({
        status: "false",
        message: "name or username or email or password is required!"
      });
      return;
    }

    const isEmailExist = await User.findOne({
      where: {
        email: email
      },
    });

    const isUserNameExist = await User.findOne({
      where: {
        username: username
      },
    });

    if (isUserNameExist || isEmailExist) {
      res.status(400).json({
        status: "false",
        message:
          "username atau email sudah ada, silahkan menggunakan username atau email lainnya"
      });

      return;
    }

    let newUser = await User.create({
      name,
      username,
      email,
      password
    });

    // jika berhasil
    res.status(201).json({
      status: "success",
      message: "data user instagram baru telah di buat",
      data: newUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getAllUser = async (req, res) => {
  try {
    let users = await User.findAll({
      include: [
        "post",
        // "post_likes",
        // "post_comments"
      ],
    });

    // untuk MVC
    // res.status(200).render("user.ejs", { users });

    // MCR
    res.status(200).json({
      status: "success",
      message: "berhasil mengambil semua data user",
      data: users
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err
    });
  }
};

getOneUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    let user = await User.findOne({
      where: {
        id: user_id
      },
      include: ["post", "post_likes", "post_comments"]
    });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: `tidak ditemukan dengan id : ${user_id}`,
        data: null
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "berhasil mengambil detail user",
      data: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err
    });
  }
};

updateUser = async (req, res) => {
  try {
    let user_id = req.params.id;
    const { name, username, email, password } = req.body;

    const isIdExist = await User.findOne({
      where: {
        id: user_id
      },
    });

    if (!isIdExist) {
      res.status(404).json({
        status: "false",
        message: "id tidak ditemukan"
      });
      return;
    }
    console.log(isIdExist)

    let query = {
      where: {
        id: user_id
      },
    };

    let updated = await User.update(
      {
        name,
        username,
        email,
        password
      },
      query
    );

    res.status(200).json({
      status: "success",
      message: "berhasil update user!",
      data: updated
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err
    });
  }
};

deleteUser = async (req, res) => {
  try {
    let user_id = req.params.id;

    const isIdExist = await User.findOne({
      where: {
        id: user_id
      },
    });

    if (!isIdExist) {
      res.status(404).json({
        status: "false",
        message: "id tidak ditemukan"
      });
      return;
    }

    let deleted = await User.destroy({
      where: {
        id: user_id
      },
    });

    res.status(200).json({
      status: "success",
      message: "berhasil menghapus user",
      data: deleted
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser
};
