import { Input, Button } from "@mantine/core";
import { useState } from "react";
import useAuthStore from "../../store/auth";

const UserDetails = () => {
  const { user, profile, updateProfile, authLoader } = useAuthStore();
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  const isUnchanged =
    name.trim() === (profile?.name || "") &&
    bio.trim() === (profile?.bio || "");

  const handleUpdate = async () => {
    if (!isUnchanged) {
      await updateProfile({ name: name.trim(), bio: bio.trim() });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full p-4 rounded-lg">
      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Email:</label>
        <Input
          disabled
          defaultValue={user?.email || ""}
          className="flex-1 text-black"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Username:</label>
        <Input disabled defaultValue={user?.username} className="flex-1" />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Name:</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your name"
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-28 font-medium text-gray-600">Bio:</label>
        <Input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
          className="flex-1"
        />
      </div>

      <Button
        className="self-end mt-4"
        color="blue"
        radius="md"
        loading={authLoader}
        disabled={isUnchanged}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  );
};

export default UserDetails;
