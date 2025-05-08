"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardAuth";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Upload,
  User,
  MapPin,
  LinkIcon,
  Twitter,
  Github,
  Mail,
  Trash2,
} from "lucide-react";
// import { toast } from "@/components/ui/use-toast";

export default function EditProfileForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dummy user data - in a real app, this would come from an API
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    bio: "Blockchain developer and writer. Passionate about decentralized technologies and their potential to transform industries.",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    twitter: "@alexjohnson",
    github: "alexjohnson",
    avatar: "/placeholder.svg?height=200&width=200",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message
      //   toast({
      //     title: "Profile updated",
      //     description: "Your profile has been successfully updated.",
      //   });

      // Redirect back to profile
      router.push("/profile");
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "There was a problem updating your profile.",
      //     variant: "destructive",
      //   });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />

      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-gray-500"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Button>
          </div>

          <Card className="border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Edit Profile
              </CardTitle>
              <CardDescription>
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
                      <AvatarImage
                        src={avatarPreview || formData.avatar}
                        alt={formData.name}
                      />
                      <AvatarFallback className="text-2xl bg-gray-900 text-white">
                        {formData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Profile Photo
                      </h3>
                      <p className="text-xs text-gray-500">
                        Upload a new avatar. Recommended size: 400x400px.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={triggerFileInput}
                        className="text-xs h-8"
                      >
                        <Upload className="h-3.5 w-3.5 mr-1.5" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs font-medium text-gray-700"
                      >
                        <User className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-xs font-medium text-gray-700"
                      >
                        <User className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        Username
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your username"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium text-gray-700"
                    >
                      <Mail className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-9 text-sm"
                      placeholder="Your email address"
                    />
                    <p className="text-xs text-gray-500">
                      Your email will not be displayed publicly unless you
                      enable it in privacy settings.
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label
                      htmlFor="bio"
                      className="text-xs font-medium text-gray-700"
                    >
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="h-20 text-sm"
                      placeholder="Write a short bio about yourself"
                    />
                    <p className="text-xs text-gray-500">
                      Brief description for your profile. Maximum 160
                      characters.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Location and Contact */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Location & Contact
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="location"
                        className="text-xs font-medium text-gray-700"
                      >
                        <MapPin className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your location"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="text-xs font-medium text-gray-700"
                      >
                        <LinkIcon className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your website URL"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Social Media */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Social Media
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="twitter"
                        className="text-xs font-medium text-gray-700"
                      >
                        <Twitter className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your Twitter handle"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="github"
                        className="text-xs font-medium text-gray-700"
                      >
                        <Github className="h-3.5 w-3.5 inline mr-1.5 text-gray-400" />
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        className="h-9 text-sm"
                        placeholder="Your GitHub username"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
