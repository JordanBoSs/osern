const ProfilePage = ({ params }) => {
  const { profile } = params;
  return (
    <div>
      <h1>Profile: {profile}</h1>
    </div>
  );
};

export default ProfilePage;
