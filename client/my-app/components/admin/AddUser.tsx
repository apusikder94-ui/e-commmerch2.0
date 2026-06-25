"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IUser } from "@/type/type";
import { useUpdateUserMutation } from "@/store/authApi";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  selected: IUser | null;
}

interface IRoleForm {
  role: "user" | "admin";
}

const UpdateUserRole = ({ open, setOpen, selected }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { handleSubmit, control, reset } = useForm<IRoleForm>({
    defaultValues: {
      role: "user",
    },
  });
  useEffect(() => {
    if (selected) {
      reset({
        role: selected.role === "admin" ? "admin" : "user",
      });
    }
  }, [selected, reset]);

  const onSubmit = async (data: IRoleForm) => {
    try {
      if (selected?._id) {
        await updateUser({
          id: selected._id,
          role: data.role, 
        }).unwrap();
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Update User Role
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label className="font-bold text-slate-700">Select Role</Label>

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full rounded-xl border-slate-200">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="user" className="rounded-lg">User</SelectItem>
                    <SelectItem value="admin" className="rounded-lg">Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-5 font-semibold transition-all shadow-md shadow-indigo-100"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Role"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserRole;