"use client";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { asyncUpdateItem } from "@/store/actions/inventory";
import { useRouter } from "next/navigation";

const EditInvoice = ({ existingData }) => {
  const router = useRouter(); // ✅ Call hooks at the top level
  const containerRef = useRef(null); // ✅
  const dispatch = useDispatch(); // ✅

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const {
    reset,
    register,
    handleSubmit,
    clearErrors,
    getValues,
    control,
    setError,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...existingData,
      items:
        Array.isArray(existingData?.items) && existingData.items.length > 0
          ? existingData.items.map((item) => ({
              product_code: item.product_code || "",
              rate: item.rate || "",
              quantity: item.quantity || "",
            }))
          : [{ product_code: "", rate: "", quantity: "" }],
      import_invoice_date: formatDate(existingData?.import_invoice_date),
      entry_date: formatDate(existingData?.entry_date),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const miscCharge = watch("misc_charge");

  const addComponent = () => {
    append({ product_code: "", rate: "", quantity: "" });
  };

  const onSubmit = (data) => {
    const cleanData = data.items.filter(
      (item) => item.product_code || item.rate || item.quantity
    );
    const updatedData = { ...data, items: cleanData, isDraft: false };

    dispatch(asyncUpdateItem(updatedData));
    router.back();
  };

  const handleDraft = (data) => {
    const cleanData = data.items.filter(
      (item) => item.product_code || item.rate || item.quantity
    );
    const updatedData = { ...data, items: cleanData, isDraft: true };

    function filterValidFields(data) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== null && value !== "" && value !== undefined;
        })
      );
    }
    const validData = filterValidFields(updatedData);
    dispatch(asyncUpdateItem(validData));
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
    router.back();
  };

  if (!existingData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="w-5/6 px-10 h-full overflow-y-auto pb-6 scroll-smooth scrollbar-thin"
      ref={containerRef}
    >
      <p className="mt-4 text-gray-500">
        Dashboard
        <i className="ri-arrow-right-s-line"></i>
        Import Data
        <i className="ri-arrow-right-s-line"></i>
        Update Entry
      </p>
      <h1 className="mt-3 font-bold">Update Entry</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4">
          <InputField
            label="Invoice Number"
            placeholder="Enter Invoice Number"
            register={register}
            name="import_invoice_number"
            type="text"
            validation={{ required: "Invoice number is required" }}
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
            validation={{ required: "BOE Number is required" }}
            errors={errors.boe_number}
            touched={touchedFields.boe_number}
          />
          <InputField
            label="BL Number"
            placeholder="Enter BL Number"
            register={register}
            name="bl_number"
            validation={{ required: "BL Number is required" }}
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
        <div className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4">
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
            validation={{ required: "Transport mode is required" }}
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
        <div className="mt-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-3 mt-3 gap-x-20 gap-y-4"
            >
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
              <div
                className={`flex gap-2 items-end ${
                  fields.length === 1 ? "justify-between" : ""
                }`}
              >
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

                <div className=" text-white">
                  {fields.length === 1 ? (
                    <div
                      className="h-10 w-10 rounded-full bg-blue-700 cursor-pointer flex items-center justify-center"
                      onClick={addComponent}
                    >
                      <i className="ri-add-fill"></i>
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
                    <div
                      className="h-10 w-10 bg-red-700 rounded-full cursor-pointer flex items-center justify-center"
                      onClick={() => remove(index)}
                    >
                      <i className="ri-close-fill"></i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6 justify-end">
          <div
            className="px-3 cursor-pointer py-2 rounded-lg bg-red-900 text-white"
            onClick={handleCancel}
          >
            Cancel
          </div>
          <div
            onClick={() => {
              clearErrors();
              handleDraft(getValues());
            }}
            className="px-4 py-2 cursor-pointer text-white bg-yellow-500 rounded"
          >
            Save Draft
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-950 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
