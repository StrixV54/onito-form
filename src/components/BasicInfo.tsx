import { FieldValues, useForm } from "react-hook-form";
import { UserDetailsT, userSchema } from "../utils/schema";
import { Dispatch, SetStateAction, useState } from "react";
import { ErrorT, UserT } from "../utils/types";

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setUser: Dispatch<SetStateAction<UserT>>;
};

export default function BasicInfo({ setCurrentPage, setUser }: Props) {
  const { handleSubmit, register } = useForm();
  const [errorMsg, setErrorMsg] = useState<ErrorT>({
    path: null,
    message: null,
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const user: UserDetailsT = await userSchema.validate(values);
      // console.log(user);
      setUser((prev: UserT) => {
        // console.log(prev);
        return {
          ...prev,
          age: user.dob,
          mobile: user.mobile!.toString(),
          name: user.name,
          sex: user.sex as string,
        } as UserT;
      });
      setCurrentPage((prev) => prev + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(Object.entries(error));
      setErrorMsg({ path: error?.path, message: error?.message });
    }
  };

  return (
    <div className="p-4">
      <div className="text-2xl mb-2">Personal details</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] flex flex-col"
      >
        <div className="flex justify-between">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter Name"
            {...register("name")}
            className="border border-slate-400"
          />
        </div>
        {errorMsg["path"] === "name" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="dob">Date of Birth or Age</label>
          <input
            id="dob"
            placeholder="DD/MM/YYYY or Age in Years"
            {...register("dob")}
          />
        </div>
        {errorMsg["path"] === "dob" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="sex">Sex</label>
          <select id="sex" {...register("sex")}>
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {errorMsg["path"] === "sex" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            placeholder="Enter Mobile"
            {...register("mobile")}
          />
        </div>
        {errorMsg["path"] === "mobile" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="govid">Govt Issued ID</label>
          <select id="govidtype" {...register("govidtype")}>
            <option value="">ID Type</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
          </select>
          <input
            id="govid"
            placeholder="Govt issued ID"
            {...register("govid")}
          />
        </div>
        {(errorMsg["path"] === "govid" || errorMsg["path"] === "govidtype") && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <button type="submit" className="border bg-slate-200">
          Submit
        </button>
      </form>
    </div>
  );
}
