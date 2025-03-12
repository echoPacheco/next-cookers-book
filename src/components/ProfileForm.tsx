"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { updateUserProfile } from "@/services/userService";
import UserType from "@/types/user";

export default function ProfileForm({ user }: { user: UserType }) {
  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewPic, setPreviewPic] = useState(
    user?.profile_pic || "/user-circle.svg",
  );
  const [message, setMessage] = useState<string | null>(null);

  const settingsOptions = [
    { icon: "/icons/dark-mode.svg", label: "Dark Mode" },
    { icon: "/icons/notification.svg", label: "Notification" },
    { icon: "/icons/language.svg", label: "Language" },
    { icon: "/icons/question.svg", label: "Help" },
  ];

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (profilePic) formData.append("profile_pic", profilePic);

    const result = await updateUserProfile(formData);
    if (result.success) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage(result.error || "Something failed");
    }
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-xs flex-col items-center gap-6">
      {message && <p className="text-sm text-green-500">{message}</p>}

      <form
        className="flex w-full flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <Image
            className="size-32 rounded-full"
            src={previewPic}
            alt="Profile Preview"
            width={128}
            height={128}
          />
          <label
            htmlFor="profilePic"
            className="mt-2 cursor-pointer text-blue-500"
          >
            Edit picture
          </label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="name" className="text-left">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col">
          <label htmlFor="email" className="text-left">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
            value={user?.email}
            disabled
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-brown px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
      <div className="mt-8 flex w-full flex-col items-start gap-3">
        <p className="text-lg font-semibold">Settings</p>
        {settingsOptions.map((option, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <Image
                src={option.icon}
                alt={`${option.label} Icon`}
                width={28}
                height={28}
              />
              <span>{option.label}</span>
            </div>
            <Image
              src="/icons/toggle.svg"
              alt="Toggle Icon"
              width={28}
              height={28}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
