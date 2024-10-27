"use client";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "./InputField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncAddItem } from "@/store/actions/inventory";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewEntry = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  function checkEmptyFields(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (
          (typeof value === "string" && value.trim() !== "") ||
          (typeof value === "number" && !isNaN(value) && value !== 0) ||
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "boolean" && key !== "isDraft" && value !== true)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    getValues,
    control,
    setError,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      items: [{ product_code: "", rate: "", quantity: "" }],
      exchange_rate: 0,
      custom_duty: 0,
      ocean_charge: 0,
      cn_h_charge: 0,
      misc_charge: 0,
      total_bill: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const miscCharge = watch("misc_charge");

  const feesAndCharges = watch([
    "exchange_rate",
    "custom_duty",
    "ocean_charge",
    "cn_h_charge",
    "misc_charge",
  ]);

  useEffect(() => {
    const [exchangeRate, customDuty, oceanCharge, cnHCharge, miscCharge] =
      feesAndCharges;

    const total =
      (Number(exchangeRate) || 1) *
      [customDuty, oceanCharge, cnHCharge, miscCharge]
        .map(Number)
        .reduce((acc, val) => acc + (val || 0), 0);

    setValue("total_bill", total);
  }, [feesAndCharges, setValue]);

  const addComponent = () => {
    append({ productCode: "", rate: "", quantity: "" });
  };

  const onSubmit = (data) => {
    const cleanData = data.items.filter(
      (item) => item.productCode || item.rate || item.quantity
    );
    const updatedData = { ...data, items: cleanData, isDraft: false };
    dispatch(asyncAddItem(updatedData));
    reset();
    router.back();
  };

  const handleDraft = (data) => {
    const cleanData = data.items.filter(
      (item) => item.productCode || item.rate || item.quantity
    );
    const updatedData = { ...data, items: cleanData };
    if (checkEmptyFields(updatedData)) {
      toast.warn("Error: Provide at least one field to save the draft.");
      return;
    }

    function filterValidFields(data) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== null && value !== "" && value !== undefined;
        })
      );
    }
    const valiData = filterValidFields(updatedData);
    const dataToDB = { ...valiData, isDraft: true };
    dispatch(asyncAddItem(dataToDB));
    reset();
    router.back();
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [fields]);

  const handleCancel = () => {
    reset();
    router.back();
  };

  return (
    <div
      className="w-5/6 px-10 h-full overflow-y-auto pb-6 scroll-smooth scrollbar-thin"
      ref={containerRef}
    >
      <p className="mt-4 text-gray-500">
        Dashboard
        <i className="ri-arrow-right-s-line"></i>
        <Link href={"/import-data"} className=" hover:text-black">
          Import Data
        </Link>
        <i className="ri-arrow-right-s-line"></i>
        <span className=" text-black font-bold">Add Entry</span>
      </p>
      <h1 className="mt-3 font-bold">Add Entry</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-3 mt-3 md:gap-x-7 sm:gap-x-3 lg:gap-x-20 gap-x-1 gap-y-4">
          <InputField
            label="Invoice Number"
            placeholder="Enter Invoice Number"
            register={register}
            name="import_invoice_number"
            type="text"
            validation={{
              required: "Invoice number is required",
            }}
            errors={errors.import_invoice_number}
            touched={touchedFields.import_invoice_number}
          />
          <InputField
            label="Import Partner"
            register={register}
            name="import_partner"
            type="select"
            options={[
              { value: "partner1", label: "Partner 1" },
              { value: "partner2", label: "Partner 2" },
              { value: "partner3", label: "Partner 3" },
            ]}
            validation={{ required: "Import partner is required" }}
            errors={errors.import_partner}
            touched={touchedFields.import_partner}
          />
          <InputField
            label="Invoice Date"
            placeholder="DD/MM/YYYY"
            register={register}
            name="import_invoice_date"
            type="date"
            validation={{
              required: "Invoice date is required",
              validate: (value) =>
                !isNaN(new Date(value)) || "Invalid date format",
            }}
            errors={errors.import_invoice_date}
            touched={touchedFields.import_invoice_date}
          />
          <InputField
            label="BOE Number"
            placeholder="Enter BOE Number"
            register={register}
            name="boe_number"
            validation={{
              required: "BOE Number is required",
            }}
            errors={errors.boe_number}
            touched={touchedFields.boe_number}
          />
          <InputField
            label="BL Number"
            placeholder="Enter BL Number"
            register={register}
            name="bl_number"
            validation={{
              required: "BL Number is required",
            }}
            errors={errors.bl_number}
            touched={touchedFields.bl_number}
          />
          <InputField
            label="Entry Date"
            placeholder="DD/MM/YYYY"
            register={register}
            name="entry_date"
            type="date"
            validation={{
              required: "Entry date is required",
              validate: (value) =>
                !isNaN(new Date(value)) || "Invalid date format",
            }}
            errors={errors.entry_date}
            touched={touchedFields.entry_date}
          />
        </div>
        <hr className="mt-7" />
        <h1 className="mt-5 font-bold">Import Charges</h1>
        <div className="grid grid-cols-3 mt-3 md:gap-x-7 sm:gap-x-3 lg:gap-x-20 gap-x-1 gap-y-4">
          <InputField
            label="Transport Mode"
            register={register}
            name="transport_mode"
            type="select"
            options={[
              { value: "air", label: "Air" },
              { value: "sea", label: "Sea" },
              { value: "land", label: "Land" },
            ]}
            validation={{
              required: "Transport mode is required",
            }}
            errors={errors.transport_mode}
            touched={touchedFields.transport_mode}
          />
          <InputField
            label="Exchange Rate"
            placeholder="e.g., 82.35"
            register={register}
            name="exchange_rate"
            type="number"
            validation={{
              required: "Exchange rate is required",
              min: { value: 0, message: "Exchange rate must be non-negative" },
            }}
            errors={errors.exchange_rate}
            touched={touchedFields.exchange_rate}
          />
          <InputField
            label="Custom Duty"
            placeholder="Enter Amount"
            register={register}
            name="custom_duty"
            type="number"
            validation={{
              required: "Custom Duty is required",
              min: { value: 0, message: "Amount must be non-negative" },
            }}
            errors={errors.custom_duty}
            touched={touchedFields.custom_duty}
          />
          <InputField
            label="Ocean Charge"
            placeholder="Enter Amount"
            register={register}
            name="ocean_charge"
            type="number"
            validation={{
              required: "Ocean Charge is required",
              min: { value: 0, message: "Amount must be non-negative" },
            }}
            errors={errors.ocean_charge}
            touched={touchedFields.ocean_charge}
          />
          <InputField
            label="C&H Charge"
            placeholder="Enter Handling Fee"
            register={register}
            name="cn_h_charge"
            type="number"
            validation={{
              required: "Handling Fee is required",
              min: { value: 0, message: "Amount must be non-negative" },
            }}
            errors={errors.cn_h_charge}
            touched={touchedFields.cn_h_charge}
          />
          <InputField
            label="Total Bill"
            placeholder="Enter Total Bill"
            register={register}
            name="total_bill"
            type="number"
            validation={{
              required: "Total Bill is required",
              min: { value: 0, message: "Amount must be non-negative" },
            }}
            errors={errors.total_bill}
            touched={touchedFields.total_bill}
          />
          <InputField
            label="Misc Charge"
            placeholder="Enter Misc Charge"
            register={register}
            name="misc_charge"
            type="number"
            errors={errors.misc_charge}
            touched={touchedFields.misc_charge}
          />
          <InputField
            label="Misc Reason"
            placeholder="Reason for Charge"
            register={register}
            name="misc_reason"
            validation={
              miscCharge
                ? {
                    required:
                      "Misc Reason is required if Misc Charge is provided",
                  }
                : {}
            }
            errors={errors.misc_reason}
            touched={touchedFields.misc_reason}
          />
        </div>

        <hr className="mt-7" />
        <h1 className="mt-5 font-bold">Item Details</h1>

        {fields.map((field, index) => (
          <div key={field.id} className="flex justify-between mt-3">
            <div className="w-1/4">
              <InputField
                label="Product Code"
                register={register}
                name={`items[${index}].product_code`}
                type="select"
                options={[
                  { value: "PC001", label: "PC001 - Product A" },
                  { value: "PC002", label: "PC002 - Product B" },
                  { value: "PC003", label: "PC003 - Product C" },
                ]}
                validation={{ required: "Product code is required" }}
                errors={errors?.items?.[index]?.product_code}
                touched={touchedFields?.items?.[index]?.product_code}
              />
            </div>

            <div className="w-1/4">
              <InputField
                label="Rate"
                placeholder="Enter Rate (per unit)"
                register={register}
                name={`items[${index}].rate`}
                type="number"
                validation={{
                  required: "Rate is required",
                  min: { value: 0, message: "Rate must be non-negative" },
                  valueAsNumber: true,
                }}
                errors={errors?.items?.[index]?.rate}
                touched={touchedFields?.items?.[index]?.rate}
              />
            </div>
            <div className="w-1/4">
              <InputField
                label="Quantity"
                placeholder="Enter Quantity"
                register={register}
                name={`items[${index}].quantity`}
                type="number"
                validation={{
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                  valueAsNumber: true,
                }}
                errors={errors?.items?.[index]?.quantity}
                touched={touchedFields?.items?.[index]?.quantity}
              />
            </div>

            <div className={`flex w-[10%] justify-end items-end`}>
              <div className=" text-white">
                {fields.length === 1 ? (
                  <div className=" flex gap-2">
                    <div className="h-10 w-10 rounded-full"></div>
                    <div
                      className="h-10 w-10 rounded-full bg-blue-700 cursor-pointer flex items-center justify-center"
                      onClick={addComponent}
                    >
                      <i className="ri-add-fill"></i>
                    </div>
                  </div>
                ) : index === fields.length - 1 ? (
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 bg-red-700 rounded-full cursor-pointer flex items-center justify-center"
                      onClick={() => remove(index)}
                    >
                      <i className="ri-close-fill"></i>
                    </div>
                    <div
                      className="h-10 w-10 bg-blue-700 rounded-full cursor-pointer flex items-center justify-center"
                      onClick={addComponent}
                    >
                      <i className="ri-add-fill"></i>
                    </div>
                  </div>
                ) : (
                  <div className=" flex gap-2">
                    <div
                      className="h-10 w-10 bg-red-700 rounded-full cursor-pointer flex items-center justify-center"
                      onClick={() => remove(index)}
                    >
                      <i className="ri-close-fill"></i>
                    </div>
                    <div className="h-10 w-10 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center mt-5 gap-5">
          <button
            className="px-3 py-2 rounded-lg bg-red-900 text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg bg-yellow-500 text-white"
            onClick={() => {
              clearErrors();
              handleDraft(getValues());
            }}
          >
            Draft it
          </button>
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-green-950 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEntry;
