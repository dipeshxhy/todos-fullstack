import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(authContext);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-12 px-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="flex flex-col items-center border-b pb-8">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-24">
                <span className="text-4xl font-bold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-4">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-500">@{user.username}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="text-sm text-gray-500">First Name</label>

              <div className="input input-bordered w-full mt-1 flex items-center">
                {user.firstName}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Last Name</label>

              <div className="input input-bordered w-full mt-1 flex items-center">
                {user.lastName}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Username</label>

              <div className="input input-bordered w-full mt-1 flex items-center">
                @{user.username}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>

              <div className="input input-bordered w-full mt-1 flex items-center">{user.email}</div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">Member Since</label>

              <div className="input input-bordered w-full mt-1 flex items-center">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-end gap-3">
            <button className="btn btn-outline">Change Password</button>

            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
