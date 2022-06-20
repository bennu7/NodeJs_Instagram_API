const { User } = require('../models');

login = async (req, res) => {
    try {
      let { username, password } = req.body;

      

      const userData = await User.findOne({
          where:{
              username: username,
              password: password
          }
      });


      if( userData ){
        res.status(200).json({
            status: "success",
            message: "berhasil login",
            data: null
          });
      }else{
        res.status(404).json({
            status: "false",
            message: "User tidak ditemukan"
          });
          return;
      }
      
  
     
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        errors: err
      });
    }
  };

module.exports = {
    login
}