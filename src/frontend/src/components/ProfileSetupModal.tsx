import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveProfile } from "../hooks/useQueries";

interface ProfileSetupModalProps {
  open: boolean;
  onComplete: () => void;
}

export default function ProfileSetupModal({
  open,
  onComplete,
}: ProfileSetupModalProps) {
  const [name, setName] = useState("");
  const saveProfile = useSaveProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveProfile.mutate(
      { name: name.trim() },
      {
        onSuccess: () => {
          toast.success("Profile saved!");
          onComplete();
        },
        onError: () => toast.error("Failed to save profile"),
      },
    );
  };

  return (
    <Dialog open={open}>
      <DialogContent data-ocid="profile.setup.dialog">
        <DialogHeader>
          <DialogTitle>Welcome! Set up your profile</DialogTitle>
          <DialogDescription>
            Please enter your name to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="profile-name">Your Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              data-ocid="profile.name.input"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!name.trim() || saveProfile.isPending}
            data-ocid="profile.setup.submit_button"
          >
            {saveProfile.isPending ? "Saving..." : "Get Started"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
