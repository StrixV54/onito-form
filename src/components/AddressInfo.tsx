import { FieldValues, useForm } from "react-hook-form";
import { AddressT, addressSchema } from "../utils/schema";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ErrorT, UserT } from "../utils/types";
import { useAppDispatch } from "../redux/hooks";
import { addData } from "../redux/store";

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  // setUser: Dispatch<SetStateAction<UserT>>;
  // addUser: (i: UserT) => void;
  user: UserT;
};
export default function AddressInfo({ setCurrentPage, user }: Props) {
  const { handleSubmit, register } = useForm();
  const [errorMsg, setErrorMsg] = useState<ErrorT>({
    path: null,
    message: null,
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (values: FieldValues) => {
    try {
      const address: AddressT = await addressSchema.validate(values);
      console.log(address);
      dispatch(
        addData({
          ...user,
          country: address.country!,
        })
      );
      setCurrentPage((prev: number) => prev + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(Object.entries(error));
      setErrorMsg({ path: error?.path, message: error?.message });
    }
  };

  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");

  const fetchData = async () => {
    const result = await fetch(`https://restcountries.com/v3.1/name/${input}`);
    const res = await result.json();
    return res;
  };

  useEffect(() => {
    console.log("first", input);
    if (input)
      fetchData().then((res) => {
        // console.log(res.map((item) => item?.name?.common));
        setOptions(res.map((item) => item?.name?.common));
      });
  }, [input]);

  return (
    <div className="p-4">
      <div className="text-2xl mb-2">Personal details</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] flex flex-col"
      >
        <div className="flex justify-between">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="Enter address"
            {...register("address")}
          />
        </div>
        {errorMsg["path"] === "address" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="state">Date of Birth or Age</label>
          <input
            id="state"
            placeholder="DD/MM/YYYY or Age in Years"
            {...register("state")}
          />
        </div>
        {errorMsg["path"] === "state" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="city">city</label>
          <select id="city" {...register("city")}>
            <option value="">Select city</option>
            <option value="Noida">Noida</option>
            <option value="New York">New York</option>
          </select>
        </div>
        {errorMsg["path"] === "city" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="country">country</label>
          <div className="relative">
            <input
              id="pincode"
              placeholder="Enter Country"
              value={input}
              {...register("country")}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            {options.length > 1 && (
              <ul className="absolute max-h-[400px] overflow-scroll bg-white shadow-md border p-2 cursor-pointer">
                {options.map((item) => (
                  <div
                    key={item}
                    onClick={() => setInput(item)}
                    className="hover:text-blue-500"
                  >
                    {item}
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        {errorMsg["path"] === "country" && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <div className="flex justify-between">
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            placeholder="Enter Pincode"
            {...register("pincode")}
          />
        </div>
        {(errorMsg["path"] === "pincode" ||
          errorMsg["path"] === "pincodetype") && (
          <div className="text-red-400 text-sm">{errorMsg["message"]}</div>
        )}
        <button type="submit" className="border bg-slate-300">
          Submit
        </button>
      </form>
    </div>
  );
}
