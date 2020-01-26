export const join = (req, res) => res.render("Join");
export const login = (req, res) => res.render("Login");
export const logout = (req, res) => res.render("Logout");
export const users = (req, res) => res.render("Users");
export const userDetail = (req, res) => res.render("User Detail");
export const editProfile = (req, res) => res.render("Edit Profile");
export const changePassword = (req, res) => res.render("Change Password");
//사실 뒤에서 return 암묵적으로 행하는중
// function alal() {
//   return true;
// }

// alal = () => true;
