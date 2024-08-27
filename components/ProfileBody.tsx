const ProfileBody = ({ userData }) => {
  if (!userData) return <p>No user data found.</p>;
  return (
    <div className="  grid place-items-center">
      <div className="grid grid-cols-2 gap-4 w-[600px] p-4 border border-red-500 ">
        <div className="bg-[#1A6566] rounded-lg p-4 grid place-items-center">
          <div className="text-center">
            <div className="text-purple-500 mb-2">📄</div>
            <h3 className="text-gray-600">Exams</h3>
            <p className="text-2xl font-bold">{userData.exams}</p>
          </div>
        </div>
        <div className="bg-green-400 rounded-lg p-4 grid place-items-center">
          <div className="text-center">
            <div className="text-text-color mb=2">💯</div>
            <h3 className="text-gray-600">Score</h3>
            <p className="text-2xl font-bold">{userData.Score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
