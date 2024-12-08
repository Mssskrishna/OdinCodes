export default function userViewer(user, token) {
  const userView = {
    user: {
      email: user.email,
      token: token,
      username: user.name,
    },
  };
  return userView;
}
